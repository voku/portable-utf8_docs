import React, { useState } from 'react';
import { Search, Copy, Check, Filter, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { ApiMethod } from '../types';

const API_METHODS: ApiMethod[] = [
  // Clean & Normalize
  {
    name: 'cleanup',
    signature: 'UTF8::cleanup(string $str, bool $keep_ascii = false): string',
    description: 'Cleans up a string, fixing UTF-8 encoding problems, removing Byte Order Marks (BOMs), fixing double UTF-8 encodings (mojibake), removing invalid bytes, and normalising odd whitespaces.',
    category: 'clean',
    example: 'UTF8::cleanup($brokenString);'
  },
  {
    name: 'clean',
    signature: 'UTF8::clean(string $str, bool $remove_bom = true, bool $normalize_whitespace = true): string',
    description: 'Clean UTF-8 strings by removing invalid characters, fixing malformed characters, and optional BOM or whitespace normalisation.',
    category: 'clean',
    example: 'UTF8::clean("foo\\x00bar");'
  },
  {
    name: 'fix_utf8',
    signature: 'UTF8::fix_utf8(string $str): string',
    description: 'Fixes double UTF-8 encoded sequences (e.g. converting "DÃ¼sseldorf" back to "Düsseldorf") while preserving valid existing encodings.',
    category: 'clean',
    example: 'UTF8::fix_utf8("DÃ¼sseldorf");'
  },
  {
    name: 'normalize_whitespace',
    signature: 'UTF8::normalize_whitespace(string $str, bool $keep_spaces = false): string',
    description: 'Normalizes varied weird Unicode space characters (like non-breaking spaces or zero-width spaces) into standardized single-space bytes.',
    category: 'clean',
    example: 'UTF8::normalize_whitespace($messyHtmlText);'
  },
  {
    name: 'remove_bom',
    signature: 'UTF8::remove_bom(string $str): string',
    description: 'Removes the UTF-8 Byte Order Mark (BOM) sequence from the beginning of the string, preventing broken header output in PHP.',
    category: 'clean',
    example: 'UTF8::remove_bom("\\xEF\\xBB\\xBFtext");'
  },

  // Measure & Slice
  {
    name: 'strlen',
    signature: 'UTF8::strlen(string $str): int',
    description: 'Get string length in number of Unicode characters instead of counting raw bytes.',
    category: 'measure',
    example: 'UTF8::strlen("fòôbàř"); // 6'
  },
  {
    name: 'substr',
    signature: 'UTF8::substr(string $str, int $start, int $length = null): string',
    description: 'Safely slice string sections by character indices without breaking multibyte characters.',
    category: 'measure',
    example: 'UTF8::substr("fòôbàř", 1, 3); // "òôb"'
  },
  {
    name: 'strpos',
    signature: 'UTF8::strpos(string $haystack, string $needle, int $offset = 0): int|false',
    description: 'Find position of first occurrence of a string inside another, using safe character indices rather than bytes.',
    category: 'measure',
    example: 'UTF8::strpos("fòôbàř", "bàř"); // 3'
  },
  {
    name: 'str_split',
    signature: 'UTF8::str_split(string $str, int $split_length = 1): array',
    description: 'Split a string into an array of individual multi-byte characters or blocks of specified character width.',
    category: 'measure',
    example: 'UTF8::str_split("😃👋", 1); // ["😃", "👋"]'
  },
  {
    name: 'wordwrap',
    signature: 'UTF8::wordwrap(string $str, int $width = 75, string $break = "\\n", bool $cut = false): string',
    description: 'Wraps a string to a given number of visible characters (not raw byte index) using a string break character.',
    category: 'measure',
    example: 'UTF8::wordwrap("Iñtër", 2, "<br>", true);'
  },
  {
    name: 'str_limit',
    signature: 'UTF8::str_limit(string $str, int $limit, string $end = "..."): string',
    description: 'Limit the number of characters in a string, cleanly appending a tail ending without truncating inside Unicode code-points.',
    category: 'measure',
    example: 'UTF8::str_limit("Testing unicode truncation", 10);'
  },

  // Transform Text
  {
    name: 'strtoupper',
    signature: 'UTF8::strtoupper(string $str): string',
    description: 'Convert a string to uppercase with full multi-byte character support (including accents like ò -> Ò).',
    category: 'transform',
    example: 'UTF8::strtoupper("fòô"); // "FÒÔ"'
  },
  {
    name: 'strtolower',
    signature: 'UTF8::strtolower(string $str): string',
    description: 'Convert a string to lowercase supporting multi-byte character structures.',
    category: 'transform',
    example: 'UTF8::strtolower("FÒÔ"); // "fòô"'
  },
  {
    name: 'to_ascii',
    signature: 'UTF8::to_ascii(string $str, string $unknown = "?", bool $strict = false): string',
    description: 'Transliterates UTF-8 diacritics, symbols, and languages cleanly into readable ASCII equivalents.',
    category: 'transform',
    example: 'UTF8::to_ascii("déjà"); // "deja"'
  },
  {
    name: 'to_filename',
    signature: 'UTF8::to_filename(string $str, bool $strict = false): string',
    description: 'Converts a string into a clean, safe, and cross-platform compatible filename by removing directory elements and control bytes.',
    category: 'transform',
    example: 'UTF8::to_filename("My File/Logo 2026.png"); // "My_File_Logo_2026.png"'
  },
  {
    name: 'css_identifier',
    signature: 'UTF8::css_identifier(string $str, string $replacement = "-"): string',
    description: 'Converts any dynamic string safely into a valid CSS identifier (classes, IDs) supporting prefix rules.',
    category: 'transform',
    example: 'UTF8::css_identifier("123-bar"); // "_23-bar"'
  },
  {
    name: 'str_titleize_for_humans',
    signature: 'UTF8::str_titleize_for_humans(string $str): string',
    description: 'Converts camelCase, kebab-case, or snake_case string structures into beautifully capitalized title lines for user display.',
    category: 'transform',
    example: 'UTF8::str_titleize_for_humans("my_database_field_name"); // "My Database Field Name"'
  },

  // Inspect & Convert
  {
    name: 'is_utf8',
    signature: 'UTF8::is_utf8(string $str, bool $strict = false): bool',
    description: 'Checks if a string is correctly encoded in valid UTF-8 sequences. Returns true if yes, false if it contains broken raw bytes.',
    category: 'inspect',
    example: 'UTF8::is_utf8($userInputBytes);'
  },
  {
    name: 'fits_to_ascii',
    signature: 'UTF8::fits_to_ascii(string $str): bool',
    description: 'Checks if a string contains only standard 7-bit ASCII characters without any multi-byte or special Unicode characters.',
    category: 'inspect',
    example: 'UTF8::fits_to_ascii("hello"); // true'
  },
  {
    name: 'encode',
    signature: 'UTF8::encode(string $to_encoding, string $str, bool $auto_detect = true): string',
    description: 'Easily convert a string from UTF-8 into any other specified character set (like ISO-8859-1 or Windows-1252) with safe replacements.',
    category: 'inspect',
    example: 'UTF8::encode("ISO-8859-1", "Düsseldorf");'
  },
  {
    name: 'decode',
    signature: 'UTF8::decode(string $from_encoding, string $str): string',
    description: 'Convert any legacy encoding character set safely back into standard UTF-8.',
    category: 'inspect',
    example: 'UTF8::decode("ISO-8859-1", $isoBytes);'
  }
];

export default function ApiExplorer() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'clean' | 'measure' | 'transform' | 'inspect'>('all');
  const [selectedMethod, setSelectedMethod] = useState<ApiMethod>(API_METHODS[0]);
  const [copied, setCopied] = useState(false);

  // Filters
  const filtered = API_METHODS.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(search.toLowerCase()) || 
                          method.description.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || method.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    { id: 'all', label: 'All Methods' },
    { id: 'clean', label: 'Clean & Normalize' },
    { id: 'measure', label: 'Measure & Slice' },
    { id: 'transform', label: 'Transform Text' },
    { id: 'inspect', label: 'Inspect & Convert' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-4 border-b border-slate-200">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id as any);
                const first = API_METHODS.find(m => cat.id === 'all' || m.category === cat.id);
                if (first) setSelectedMethod(first);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === cat.id
                  ? 'bg-white text-slate-900 border border-slate-200 shadow-sm font-semibold'
                  : 'text-slate-600 border border-transparent hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative md:w-80">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search UTF8 methods..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              const nextFiltered = API_METHODS.filter(m => 
                m.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
                m.description.toLowerCase().includes(e.target.value.toLowerCase())
              );
              if (nextFiltered.length > 0) {
                setSelectedMethod(nextFiltered[0]);
              }
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-sky-500 transition-all placeholder-slate-400"
          />
        </div>
      </div>

      {/* Explorer Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: Method List */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl max-h-[480px] overflow-y-auto p-2 shadow-sm">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm font-mono">
              No matching methods found
            </div>
          ) : (
            <div className="space-y-0.5">
              {filtered.map((method) => (
                <button
                  key={method.name}
                  onClick={() => setSelectedMethod(method)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                    selectedMethod.name === method.name
                      ? 'bg-sky-50 text-sky-950 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`font-mono text-xs font-semibold ${
                      selectedMethod.name === method.name ? 'text-sky-800' : 'text-slate-700 group-hover:text-slate-950'
                    }`}>
                      UTF8::{method.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 capitalize font-mono font-medium">
                      {method.category} helper
                    </span>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                    selectedMethod.name === method.name ? 'bg-sky-500' : 'bg-transparent group-hover:bg-slate-200'
                  }`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Detailed documentation card */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            {/* Header: Name and Category badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
              <h4 className="text-xl font-mono font-bold text-slate-900">
                UTF8::<span className="text-sky-700">{selectedMethod.name}</span>
              </h4>
              <span className="text-[10px] font-mono tracking-wider font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md">
                {selectedMethod.category} API
              </span>
            </div>

            {/* Signature block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-mono text-xs text-slate-800 break-all select-all leading-relaxed font-semibold">
              {selectedMethod.signature}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedMethod.description}
            </p>

            {/* Live Example Code Block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Usage Example</span>
                <button
                  onClick={() => handleCopy(`use voku\\helper\\UTF8;\n\n` + selectedMethod.example)}
                  className="text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  {copied ? (
                    <span className="text-emerald-600 inline-flex items-center gap-0.5"><Check className="w-3 h-3" /> Copied</span>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto font-semibold">
                <code>
                  {`<?php\n\nuse voku\\helper\\UTF8;\n\n// ` + selectedMethod.description.split('.')[0] + `.\n` + selectedMethod.example}
                </code>
              </pre>
            </div>
          </div>

          {/* Quick link */}
          <div className="pt-4 border-t border-slate-200/60 mt-5 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-600"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fully production-tested</span>
            <a 
              href={`https://github.com/voku/portable-utf8#portable-utf-8--api`} 
              target="_blank" 
              rel="noreferrer"
              className="text-sky-700 hover:underline hover:text-sky-800 flex items-center gap-0.5 font-semibold"
            >
              Readme Docs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
