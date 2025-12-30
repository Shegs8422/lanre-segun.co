import { _ as __nuxt_component_0 } from './nuxt-link-BPu0_itI.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { d as useRoute, b as useSeoMeta } from './server.mjs';
import { u as useNotes } from './useNotes-D7icjz58.mjs';
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
import './useSupabaseClient-xv77-Kdn.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { getNoteBySlug, notes, fetchNotes } = useNotes();
    if (notes.value.length === 0) {
      [__temp, __restore] = withAsyncContext(() => fetchNotes()), await __temp, __restore();
    }
    const note = computed(() => getNoteBySlug(route.params.slug));
    const pending = ref(false);
    const formattedDate = computed(() => {
      if (!note.value?.date) return "";
      const d = new Date(note.value.date);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      });
    });
    const parsedContent = computed(() => note.value?.content || "");
    useSeoMeta({
      title: () => note.value ? `${note.value.title} - Lanre Segun` : "Note Not Found",
      description: () => note.value?.excerpt || "Detailed view of the note.",
      ogTitle: () => note.value?.title,
      ogDescription: () => note.value?.excerpt
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground selection:bg-blue-500/20" }, _attrs))}><div class="max-w-3xl mx-auto px-6 pt-32 pb-40 flex flex-col gap-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/notes",
        class: "w-fit flex items-center gap-2 px-4 py-2 bg-component border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:border-blue-500/40 transition-all active:scale-95 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1"${_scopeId}><path d="M19 12H5"${_scopeId}></path><path d="M12 19l-7-7 7-7"${_scopeId}></path></svg> Notes `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "transition-transform group-hover:-translate-x-1"
              }, [
                createVNode("path", { d: "M19 12H5" }),
                createVNode("path", { d: "M12 19l-7-7 7-7" })
              ])),
              createTextVNode(" Notes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(pending)) {
        _push(`<div class="flex items-center justify-center py-20"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>`);
      } else if (unref(note)) {
        _push(`<article class="flex flex-col gap-12"><header class="flex flex-col gap-4"><h1 class="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-foreground">${ssrInterpolate(unref(note).title)}</h1><time${ssrRenderAttr("datetime", unref(note).date)} class="text-sm font-medium text-muted-foreground flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> ${ssrInterpolate(unref(formattedDate))}</time></header><div class="prose prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/80">${unref(parsedContent) ?? ""}</div></article>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(note) && !unref(pending)) {
        _push(`<div class="text-center py-20 bg-component rounded-3xl border border-border"><p class="text-muted-foreground font-medium">Note not found.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/notes",
          class: "mt-4 inline-block text-blue-500 font-bold hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to all notes`);
            } else {
              return [
                createTextVNode("Back to all notes")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notes/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CLsnLeTI.mjs.map
