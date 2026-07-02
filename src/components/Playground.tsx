import React, { useState } from 'react';
import { Copy, Check, Sparkles, Cpu, Code2 } from 'lucide-react';
import { CodeExample } from '../types';

const EXAMPLES: CodeExample[] = [
  {
    id: 'strlen-vs-native',
    name: 'Native bytes vs Characters',
    method: 'UTF8::strlen()',
    input: 'fòôbàř',
    description: "PHP's native string functions operate strictly on bytes. Portable UTF-8 provides character-aware helpers that count actual Unicode code points, ensuring accurate text lengths regardless of local server configuration.",
    phpCode: `use voku\\helper\\UTF8;\n\n$input = 'fòôbàř';\necho UTF8::strlen($input); // 6`,
    nativePhpCode: `echo strlen($input); // 10`,
    nativeOutput: '10 bytes (incorrect for UTF-8)',
    portableOutput: '6 characters (correct)',
    explanation: "The input string contains accented multi-byte characters like 'ò' and 'ř'. Standard PHP's strlen() counts bytes, erroneously reporting a length of 10. UTF8::strlen() measures characters correctly across all platforms."
  },
  {
    id: 'strtoupper-vs-native',
    name: 'Accents & Casing',
    method: 'UTF8::strtoupper()',
    input: 'fòôbàř',
    description: 'Native strtoupper relies on server locales and completely ignores accented multibyte characters. Portable UTF-8 safely converts all characters to their uppercase Unicode counterparts out-of-the-box.',
    phpCode: `use voku\\helper\\UTF8;\n\n$input = 'fòôbàř';\necho UTF8::strtoupper($input); // FÒÔBÀŘ`,
    nativePhpCode: `echo strtoupper($input); // FòôBàř`,
    nativeOutput: 'FòôBàř (accents remain lowercase)',
    portableOutput: 'FÒÔBÀŘ (fully converted)',
    explanation: "Standard PHP strtoupper() is unable to uppercase multi-byte characters unless complex and environment-dependent server locales are configured. UTF8::strtoupper() handles this safely and portably."
  },
  {
    id: 'cleanup-broken',
    name: 'Broken Input / Mojibake',
    method: 'UTF8::cleanup()',
    input: '\\xEF\\xBB\\xBF„Abcdef\\xc2\\xa0\\x20…” — 😃 - DÃ¼sseldorf',
    description: 'Clean up hostile or corrupted inputs: strip hidden Byte Order Marks (BOMs), fix odd whitespace, repair classic double-encoded mojibake, and filter invalid bytes before saving to your database.',
    phpCode: `use voku\\helper\\UTF8;\n\n$broken = "\\xEF\\xBB\\xBF„Abcdef\\xc2\\xa0\\x20…” — 😃 - DÃ¼sseldorf";\necho UTF8::cleanup($broken);\n// Output: „Abcdef  …” — 😃 - Düsseldorf`,
    nativePhpCode: `// PHP has no built-in mojibake repair\necho $broken;`,
    nativeOutput: '„Abcdef\xa0 …” — 😃 - DÃ¼sseldorf (corrupted and contains hidden BOM)',
    portableOutput: '„Abcdef  …” — 😃 - Düsseldorf (clean and safe)',
    explanation: "This cleans the raw UTF-8 Byte Order Mark (BOM), normalizes non-breaking whitespace constructs (\\xc2\\xa0), and repairs classic double-encoded Mojibake ('DÃ¼sseldorf' -> 'Düsseldorf'). This ensures consistent rendering across browsers."
  },
  {
    id: 'to-ascii',
    name: 'ASCII Transliteration',
    method: 'UTF8::to_ascii()',
    input: 'déjà σσς iıii',
    description: 'Generate readable, ASCII-safe values from complex Unicode strings. Excellent for generating high-quality URL slugs, filenames, and database search indexes.',
    phpCode: `use voku\\helper\\UTF8;\n\necho UTF8::to_ascii('déjà σσς iıii'); // deja sss iiii`,
    nativePhpCode: `// PHP has no simple built-in transliteration\necho $input;`,
    nativeOutput: 'déjà σσς iıii (not converted)',
    portableOutput: 'deja sss iiii (clean ASCII)',
    explanation: "Accented characters ('é', 'à'), Greek letters ('σ', 'ς'), and language-specific glyphs (like Turkish dotless 'ı') are cleanly mapped to their closest readable ASCII equivalents."
  },
  {
    id: 'css-identifier',
    name: 'CSS-safe Classnames',
    method: 'UTF8::css_identifier()',
    input: '123foo/bar!!!',
    description: 'Convert dynamic user labels, categories, or tags into perfectly valid CSS class selectors, ensuring compliance with strict W3C CSS standards without ad-hoc regular expressions.',
    phpCode: `use voku\\helper\\UTF8;\n\necho UTF8::css_identifier('123foo/bar!!!'); // _23foo-bar`,
    nativePhpCode: `// Naive regex replacement\n$css = preg_replace('/[^a-zA-Z0-9-]/', '-', $input);`,
    nativeOutput: '123foo-bar--- (invalid CSS selector)',
    portableOutput: '_23foo-bar (fully valid)',
    explanation: "CSS class names cannot begin with digits. UTF8::css_identifier() replaces invalid symbols with hyphens and prepends an underscore if the string starts with a digit, producing a valid selector."
  },
  {
    id: 'wordwrap-safe',
    name: 'Safe Word Wrap',
    method: 'UTF8::wordwrap()',
    input: 'Iñtërnâtiônàlizætiøn',
    description: 'Wrap and split multibyte strings at explicit character boundaries without dividing multibyte Unicode characters in half and creating corrupt byte sequences.',
    phpCode: `use voku\\helper\\UTF8;\n\n$text = 'Iñtërnâtiônàlizætiøn';\necho UTF8::wordwrap($text, 2, '<br>', true);`,
    nativePhpCode: `echo wordwrap($text, 2, '<br>', true);`,
    nativeOutput: 'Iñ<br>të<br>... (with split raw bytes causing invalid encoding / black diamonds)',
    portableOutput: 'Iñ<br>të<br>rn<br>ât<br>iô<br>nâ<br>li<br>zæ<br>ti<br>øn',
    explanation: "Standard PHP wordwrap() slices strings by byte offsets. For UTF-8, this cuts characters (like 'ñ', 'ë', 'â') in half, causing rendering corruption. UTF8::wordwrap() respects Unicode boundary code points."
  }
];

export default function Playground() {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(EXAMPLES[0]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar: Example Selectors */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> API Examples
          </h4>
          <div className="space-y-1.5">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(ex)}
                className={`w-full text-left px-3.5 py-3 rounded-xl border transition-all flex flex-col gap-1 ${
                  selectedExample.id === ex.id
                    ? 'bg-sky-50 border-sky-200 text-sky-950 shadow-sm font-semibold'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="font-mono text-sm">{ex.method}</span>
                <span className="text-xs text-slate-500 font-sans">{ex.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Informative DX box */}
        <div className="bg-slate-100/50 p-5 border border-slate-200 rounded-2xl text-xs text-slate-600 leading-relaxed font-medium">
          <p className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            Adaptive Execution Engine
          </p>
          <p>
            Under the hood, if <code className="text-indigo-600 font-bold font-mono">mbstring</code>, <code className="text-indigo-600 font-bold font-mono">iconv</code>, or <code className="text-indigo-600 font-bold font-mono">intl</code> are installed on the server, portable-utf8 proxies calls to them for native speed. If absent, it automatically engages optimized, fully-compatible pure-PHP fallback wrappers.
          </p>
        </div>
      </div>

      {/* Main Sandbox Panel */}
      <div className="lg:col-span-8 space-y-6">
        {/* Editor Area */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <span className="text-xs font-mono text-slate-500 ml-2">portable-utf8-demo.php</span>
            </div>
            <div className="text-xs font-mono text-sky-850 flex items-center gap-1 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 font-bold">
              <Code2 className="w-3.5 h-3.5" /> {selectedExample.method}
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{selectedExample.name}</h4>
              <p className="text-sm text-slate-650 leading-relaxed">
                {selectedExample.description}
              </p>
            </div>

            {/* Static Input Display */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Test Case Input String</span>
                <span className="font-mono text-sm text-slate-800 font-semibold break-all">{selectedExample.input}</span>
              </div>
              <span className="text-[10px] font-mono bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded shadow-xs font-semibold">STATIC DEMO</span>
            </div>

            {/* Side-by-side PHP code snippets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Native code view */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200/60">
                  <span className="text-xs font-mono text-rose-700 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Native PHP
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedExample.nativePhpCode, 'native-code')}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Copy snippet"
                  >
                    {copiedText === 'native-code' ? <span className="text-[10px] text-emerald-600 font-semibold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-600 overflow-x-auto whitespace-pre-wrap leading-relaxed font-semibold">
                  <code>{selectedExample.nativePhpCode}</code>
                </pre>
              </div>

              {/* Portable UTF8 code view */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200/60">
                  <span className="text-xs font-mono text-emerald-700 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Portable UTF-8
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedExample.phpCode, 'portable-code')}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Copy snippet"
                  >
                    {copiedText === 'portable-code' ? <span className="text-[10px] text-emerald-600 font-semibold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-850 overflow-x-auto whitespace-pre-wrap leading-relaxed font-bold">
                  <code>{selectedExample.phpCode}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Results Comparison */}
          <div className="bg-slate-50 p-6 border-t border-slate-200">
            <h5 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 font-bold">
              Runtime Output Comparison (Pre-computed PHP Results)
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Native Output */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-2 font-semibold">Native PHP Output:</div>
                <div className="font-mono text-xs text-rose-700 bg-rose-50/50 px-3 py-2.5 rounded border border-rose-100 break-words min-h-[44px] flex items-center font-bold">
                  {selectedExample.nativeOutput}
                </div>
              </div>

              {/* Portable UTF8 Output */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase mb-2 font-semibold">UTF8 Helper Output:</div>
                <div className="font-mono text-xs text-emerald-800 bg-emerald-50/50 px-3 py-2.5 rounded border border-emerald-100 break-words min-h-[44px] flex items-center justify-between font-bold">
                  <span>{selectedExample.portableOutput}</span>
                  <button 
                    onClick={() => copyToClipboard(String(selectedExample.portableOutput), 'output-copy')}
                    className="text-slate-400 hover:text-slate-600 pl-2 shrink-0"
                    title="Copy result"
                  >
                    {copiedText === 'output-copy' ? <span className="text-[10px] text-emerald-600 font-semibold">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="mt-4 flex gap-3 text-xs bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed text-slate-600 shadow-xs font-semibold">
              <span className="text-base leading-none">💡</span>
              <p>{selectedExample.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
