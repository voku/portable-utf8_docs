import React, { useState } from 'react';
import { 
  Download, 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  Check, 
  Copy, 
  Sparkles, 
  Code, 
  Layers, 
  Cpu, 
  Code2, 
  ServerCrash,
  PackageCheck,
  CheckCircle2,
  FileCode2,
  Lock
} from 'lucide-react';
import StatsGrid from './components/StatsGrid';
import Playground from './components/Playground';
import ApiExplorer from './components/ApiExplorer';

export default function App() {
  const [composerCopied, setComposerCopied] = useState(false);
  const [strictCopied, setStrictCopied] = useState(false);

  const copyComposer = () => {
    navigator.clipboard.writeText('composer require voku/portable-utf8');
    setComposerCopied(true);
    setTimeout(() => setComposerCopied(false), 2000);
  };

  const copyStrict = () => {
    const code = `define('PORTABLE_UTF8__DISABLE_AUTO_ENCODING', true);\nrequire_once __DIR__ . '/vendor/autoload.php';`;
    navigator.clipboard.writeText(code);
    setStrictCopied(true);
    setTimeout(() => setStrictCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-grid-pattern text-slate-800 selection:bg-sky-500/20 selection:text-sky-900">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-50 to-indigo-50 border border-slate-200 shadow-sm font-bold text-slate-900 text-base">
                🉑
              </span>
              <div>
                <span className="font-display font-bold text-slate-900 tracking-tight text-sm sm:text-base">Portable UTF-8</span>
                <span className="hidden sm:inline-block text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded ml-2 border border-slate-200 font-semibold">for PHP</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <a href="#metrics" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Metrics</a>
              <a href="#sandbox" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Showcase</a>
              <a href="#why" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">Why</a>
              <a href="#api" className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">API Reference</a>
            </nav>

            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/voku/portable-utf8" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-950 transition-all shadow-sm font-semibold"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft elegant abstract glows */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left: Title and Context */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-sky-50 border border-sky-200 text-sky-800">
                <Sparkles className="w-3 h-3 text-sky-600" /> Unicode-safe string handling for PHP
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                UTF-8 that survives <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">production input</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-650 leading-relaxed max-w-2xl">
                Portable UTF-8 gives PHP projects a clean, static API for Unicode-aware string handling, broken input cleanup, transliteration, encoding conversion, and safe text utilities without requiring standard multibyte extensions installed.
              </p>

              {/* Install and Action block */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* Composer Copy Tool */}
                <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 sm:w-80 group hover:border-slate-300 transition-colors shadow-sm">
                  <Terminal className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <code className="text-xs font-mono text-slate-800 font-semibold flex-grow select-all break-all">
                    composer require voku/portable-utf8
                  </code>
                  <button 
                    onClick={copyComposer}
                    className="ml-2 text-slate-400 hover:text-slate-900 transition-colors shrink-0"
                    title="Copy command"
                  >
                    {composerCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <a 
                  href="#sandbox" 
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-bold font-display rounded-xl bg-slate-900 hover:bg-slate-850 text-white shadow-md hover:shadow-lg shadow-slate-900/10 transition-all text-center"
                >
                  Feature Showcase
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Package Meta badges */}
              <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-500 font-mono font-medium">
                <span className="flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-sky-600" /> Composer compatible
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Strict PHP 8+ Ready
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <a 
                  href="https://encoder.suckup.de/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sky-700 hover:text-sky-950 hover:underline flex items-center gap-1 inline-flex font-semibold"
                >
                  <span>Online Encoder Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Hero Right: High Contrast Visual representation */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg relative">
              <div className="absolute top-3 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-[10px] font-mono font-bold text-sky-850">
                <span>DX COMPILATION</span>
              </div>

              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-semibold">Native bytes vs UTF-8 characters</h3>
              
              <div className="space-y-4 font-mono text-xs">
                {/* Accent demo */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="text-slate-500">Input String: <span className="text-slate-900 font-semibold">'$input = "fòôbàř";'</span></div>
                  <div className="flex items-center justify-between text-rose-700 pt-1 border-t border-slate-200/50 mt-1">
                    <span>echo strlen($input);</span>
                    <span className="font-semibold bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded text-[10px]">10 bytes ❌</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>echo UTF8::strlen($input);</span>
                    <span className="font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[10px]">6 characters ✅</span>
                  </div>
                </div>

                {/* Case convert demo */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-rose-700">
                    <span>echo strtoupper($input);</span>
                    <span className="font-semibold bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded text-[10px]">FòôBàř ❌</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700">
                    <span>echo UTF8::strtoupper($input);</span>
                    <span className="font-semibold bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[10px]">FÒÔBÀŘ ✅</span>
                  </div>
                </div>

                {/* Cleanup description */}
                <div className="p-3 text-slate-600 text-[11px] leading-relaxed border-t border-slate-200 pt-4 font-sans">
                  PHP's native string helpers operate on raw bytes. Portable UTF-8 provides character-aware wrappers that match the native PHP API structure while keeping encoding issues hidden safely.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Package Metrics Section */}
      <section id="metrics" className="py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsGrid />
        </div>
      </section>

      {/* Sandbox Playground Section */}
      <section id="sandbox" className="py-16 border-t border-slate-200 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-650 font-bold">Feature Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Compare Native PHP vs. Portable UTF-8
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Browse common multi-byte operations and see how Portable UTF-8 resolves classic encoding bugs, case issues, and byte-splitting errors safely.
            </p>
          </div>

          <Playground />
        </div>
      </section>

      {/* Why It Exists (The DX Grid) */}
      <section id="why" className="py-16 border-t border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Why text left */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">Why Portable UTF-8?</span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                PHP strings are bytes until you make them behave.
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed">
                Modern databases and websites operate entirely on UTF-8, but standard PHP was designed for single-byte structures. 
                Portable UTF-8 normalizes behavior across environments without complex boilerplate.
              </p>
            </div>

            {/* Why grid right */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-slate-300 hover:shadow-sm transition-all">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 text-lg font-bold">
                  🗃️
                </span>
                <h3 className="font-semibold text-slate-900 text-base">Portable fallbacks</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid strict server dependencies. Runs automatically without requiring mbstring, iconv, or intl extensions, falling back to pure-PHP emulations seamlessly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-slate-300 hover:shadow-sm transition-all">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-lg font-bold">
                  ⚙️
                </span>
                <h3 className="font-semibold text-slate-900 text-base">Static API</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Intuitive class structure. Keep your application simple. Use explicit, self-documenting method calls like <code className="text-indigo-600 bg-slate-50 px-1 py-0.5 rounded border border-slate-200 text-[10px]">UTF8::strlen()</code> directly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-slate-300 hover:shadow-sm transition-all">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 text-lg font-bold">
                  🧼
                </span>
                <h3 className="font-semibold text-slate-900 text-base">Sanitary Cleanup</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Purify hostile inputs. Clean hidden byte order marks, double UTF-8 sequence anomalies, non-standard whitespaces, and mojibake before writing to DB.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* API Explorer Section */}
      <section id="api" className="py-16 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-bold">Searchable Reference</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-1">
              Curated API Catalogue
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Browse methods by category or search instantly to find parameters, signatures, and quick-copy usage examples.
            </p>
          </div>

          <ApiExplorer />
        </div>
      </section>

      {/* Autoload Bootstrap DX guidelines */}
      <section className="py-16 border-t border-slate-200 bg-slate-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded text-xs font-mono font-semibold">
                <Lock className="w-3.5 h-3.5" /> Strict Application Configuration
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">
                Control encoding variables dynamically
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By default, Portable UTF-8 configures PHP encoding constraints at runtime to ensure system-wide consistency. For highly customized projects, you can lock settings manually before bootstrapping composer.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-semibold">
                <span>bootstrap.php</span>
                <button 
                  onClick={copyStrict}
                  className="text-slate-500 hover:text-slate-950 transition-colors inline-flex items-center gap-1"
                >
                  {strictCopied ? (
                    <span className="text-emerald-600 inline-flex items-center gap-0.5"><Check className="w-3 h-3" /> Copied</span>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Snippet
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-5 overflow-x-auto font-semibold">
                <code>{`<?php\n\ndeclare(strict_types=1);\n\n// Optional: keep application-level encoding settings under your control\ndefine('PORTABLE_UTF8__DISABLE_AUTO_ENCODING', true);\n\nrequire_once __DIR__ . '/vendor/autoload.php';\n\nuse voku\\helper\\UTF8;\n\n$cleaned = UTF8::cleanup($rawInput);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-600">
            
            <div className="flex items-center gap-2">
              <span className="text-base">🉑</span>
              <span className="font-display font-bold text-slate-900 text-sm">voku/portable-utf8</span>
              <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded font-semibold">v6.0+</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6 font-semibold">
              <a href="https://github.com/voku/portable-utf8" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">GitHub Repository</a>
              <a href="https://packagist.org/packages/voku/portable-utf8" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">Packagist Page</a>
              <a href="https://github.com/voku/portable-utf8/blob/master/LICENSE" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">MIT License</a>
              <a href="https://encoder.suckup.de/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">Direct Demo Encoder</a>
            </div>

            <div>
              <p className="text-xs font-mono text-slate-500">Released under MIT. Designed with precision for DX.</p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
