"use client";

import { useState } from "react";
import { Play, Copy, Check, Terminal, Clock, RefreshCw, Send } from "lucide-react";

interface EndpointPreset {
  name: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  sampleBody?: string;
}

const PRESETS: EndpointPreset[] = [
  {
    name: "System & Runtime Telemetry",
    method: "GET",
    path: "/api/stats",
    description: "Returns Next.js App Router runtime environment, uptime, and computed metrics with caching headers.",
  },
  {
    name: "Query Catalog Items",
    method: "GET",
    path: "/api/products?category=Developer%20Tools",
    description: "Tests URL search parameters query parsing in Next.js Route Handlers.",
  },
  {
    name: "Create Catalog Item (POST)",
    method: "POST",
    path: "/api/products",
    description: "Demonstrates request.json() validation and mutating server collections with HTTP 201.",
    sampleBody: JSON.stringify(
      {
        title: "Next.js Edge Microservices Hub",
        category: "Developer Tools",
        price: 99,
        description: "Zero-cold-start Edge function starter built with V8 isolates.",
      },
      null,
      2
    ),
  },
  {
    name: "Fetch Task Tracker List",
    method: "GET",
    path: "/api/tasks",
    description: "Fetches collection of tasks serialized as standard Web API NextResponse.json.",
  },
];

export function ApiConsole() {
  const [selectedPreset, setSelectedPreset] = useState<EndpointPreset>(PRESETS[0]);
  const [method, setMethod] = useState<"GET" | "POST">(PRESETS[0].method);
  const [endpoint, setEndpoint] = useState<string>(PRESETS[0].path);
  const [requestBody, setRequestBody] = useState<string>(PRESETS[0].sampleBody || "");

  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseJson, setResponseJson] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const selectPreset = (preset: EndpointPreset) => {
    setSelectedPreset(preset);
    setMethod(preset.method);
    setEndpoint(preset.path);
    setRequestBody(preset.sampleBody || "");
    setStatusCode(null);
    setResponseJson(null);
  };

  const handleExecute = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method === "POST" && requestBody.trim()) {
        options.body = requestBody;
      }

      const res = await fetch(endpoint, options);
      const end = performance.now();
      setDurationMs(Math.round(end - start));
      setStatusCode(res.status);

      const headersObj: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        headersObj[key] = val;
      });
      setResponseHeaders(headersObj);

      const json = await res.json();
      setResponseJson(json);
    } catch (err: any) {
      setStatusCode(500);
      setResponseJson({ error: err.message || "Failed to execute request" });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!responseJson) return;
    navigator.clipboard.writeText(JSON.stringify(responseJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Preset Pills */}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Select Route Handler Preset
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset.name === preset.name;
            return (
              <button
                key={preset.name}
                onClick={() => selectPreset(preset)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      preset.method === "GET"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {preset.method}
                  </span>
                  <span className="font-semibold text-xs text-slate-800 truncate">
                    {preset.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Request Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as any)}
              className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>

          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
              http://localhost:3000
            </span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full pl-36 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleExecute}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Send Request</span>
          </button>
        </div>

        {method === "POST" && (
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Request JSON Payload
            </label>
            <textarea
              rows={4}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full font-mono text-xs bg-slate-900 text-emerald-400 p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Response Panel */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Response Console
            </span>
          </div>

          {statusCode !== null && (
            <div className="flex items-center gap-3 text-xs font-mono">
              <span
                className={`px-2 py-0.5 rounded font-semibold ${
                  statusCode >= 200 && statusCode < 300
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-rose-950 text-rose-400 border border-rose-800"
                }`}
              >
                Status: {statusCode}
              </span>
              {durationMs !== null && (
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {durationMs}ms
                </span>
              )}
              <button
                onClick={handleCopy}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                title="Copy JSON"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 font-mono text-xs overflow-x-auto max-h-[460px]">
          {responseJson ? (
            <pre className="text-slate-200 leading-relaxed">
              {JSON.stringify(responseJson, null, 2)}
            </pre>
          ) : (
            <div className="text-slate-500 py-10 text-center">
              <p>Click &quot;Send Request&quot; above to inspect the live response from the Next.js Route Handler.</p>
              <p className="text-[11px] text-slate-600 mt-1">
                Endpoints are powered by Standard Web APIs (<code className="text-slate-400">Request</code>, <code className="text-slate-400">Response</code>, <code className="text-slate-400">NextResponse</code>).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
