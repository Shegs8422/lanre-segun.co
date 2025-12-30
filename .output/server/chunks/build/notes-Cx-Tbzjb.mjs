import { defineComponent, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useNotes } from './useNotes-Ddzju8C2.mjs';
import { a as useSeoMeta } from './server.mjs';
import './useSupabaseClient-CkLFOMIR.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "notes",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchNotes, notes } = useNotes();
    [__temp, __restore] = withAsyncContext(() => fetchNotes()), await __temp, __restore();
    const years = computed(() => {
      const uniqueYears = new Set(notes.value.map((n) => n.year));
      return Array.from(uniqueYears).sort((a, b) => Number(b) - Number(a));
    });
    const sortedYears = computed(() => years.value);
    const notesByYear = computed(() => {
      const grouped = {};
      years.value.forEach((year) => {
        grouped[year] = notes.value.filter((n) => n.year === year);
      });
      return grouped;
    });
    useSeoMeta({
      title: "Notes - Lanre Segun",
      description: "Thoughts, ideas, and ramblings. A collection of notes on design, engineering, and personal growth.",
      ogTitle: "Notes - Lanre Segun",
      ogDescription: "Thoughts, ideas, and ramblings. A collection of notes on design, engineering, and personal growth.",
      ogImage: "/og-image.png",
      ogUrl: "https://lanre-segun.vercel.app/notes",
      twitterTitle: "Notes - Lanre Segun",
      twitterDescription: "Thoughts, ideas, and ramblings. A collection of notes on design, engineering, and personal growth.",
      twitterImage: "/og-image.png",
      twitterCard: "summary"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground flex flex-col pt-32 pb-20 px-6 sm:px-12 md:px-24" }, _attrs))}><div class="max-w-3xl mx-auto w-full flex flex-col gap-16"><!--[-->`);
      ssrRenderList(unref(sortedYears), (year) => {
        _push(`<div class="flex flex-col gap-8"><h2 class="text-xl font-medium text-white/40">${ssrInterpolate(year)}</h2><div class="flex flex-col gap-8"><!--[-->`);
        ssrRenderList(unref(notesByYear)[year], (note) => {
          _push(`<div class="group flex items-baseline justify-between gap-8 border-b border-white/5 pb-4 hover:border-white/20 transition-colors cursor-pointer"><div class="flex flex-col gap-1"><h3 class="text-lg font-medium group-hover:text-primary transition-colors">${ssrInterpolate(note.title)}</h3><span class="text-sm text-muted-foreground hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300 transform">${ssrInterpolate(note.excerpt)}</span></div><span class="text-sm font-mono text-muted-foreground whitespace-nowrap">${ssrInterpolate(note.month)} ${ssrInterpolate(note.year)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(years).length === 0) {
        _push(`<div class="text-center text-muted-foreground py-20"> No notes found. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=notes-Cx-Tbzjb.mjs.map
