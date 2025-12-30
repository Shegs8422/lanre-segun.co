import { _ as __nuxt_component_0 } from './nuxt-link-CD-o4OdI.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useNotes } from './useNotes-CxQGPk0k.mjs';
import { b as useSeoMeta } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './useSupabaseClient-CkLFOMIR.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
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
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground flex flex-col pt-32 pb-32 px-6 sm:px-12 md:px-24 transition-colors duration-500" }, _attrs))}><div class="max-w-xl mx-auto w-full flex flex-col gap-12"><!--[-->`);
      ssrRenderList(unref(sortedYears), (year) => {
        _push(`<div class="flex flex-col gap-8"><h2 class="text-xl font-bold text-foreground tracking-tight">${ssrInterpolate(year)}</h2><div class="flex flex-col gap-2 -mx-4"><!--[-->`);
        ssrRenderList(unref(notesByYear)[year], (note) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: note.id,
            to: `/notes/${note.slug}`,
            class: "group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-foreground/5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors shrink-0"${_scopeId}>${ssrInterpolate(note.title)}</span><div class="grow h-px bg-foreground/10 transition-colors mt-1"${_scopeId}></div><span class="text-[13px] font-medium text-foreground/40 group-hover:text-foreground/60 transition-colors whitespace-nowrap"${_scopeId}>${ssrInterpolate(note.month)} ${ssrInterpolate(note.year)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors shrink-0" }, toDisplayString(note.title), 1),
                  createVNode("div", { class: "grow h-px bg-foreground/10 transition-colors mt-1" }),
                  createVNode("span", { class: "text-[13px] font-medium text-foreground/40 group-hover:text-foreground/60 transition-colors whitespace-nowrap" }, toDisplayString(note.month) + " " + toDisplayString(note.year), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(years).length === 0) {
        _push(`<div class="text-center text-muted-foreground py-20 font-medium"> No notes found. </div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BRsSTx1h.mjs.map
