import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { u as useGallery } from './useGallery-DEZYYCOP.mjs';
import { e as useLayout, b as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "photos",
  __ssrInlineRender: true,
  setup(__props) {
    const { galleryItems } = useGallery();
    useLayout();
    const isLightboxOpen = ref(false);
    const currentIndex = ref(0);
    const isMobile = ref(false);
    ref(null);
    useSeoMeta({
      title: "Photos - Lanre Segun",
      description: "A visual collection of moments and captures."
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background pt-24 pb-20 px-5 transition-colors duration-500" }, _attrs))} data-v-fd977552><div class="w-full" data-v-fd977552><div class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3" data-v-fd977552><!--[-->`);
      ssrRenderList(unref(galleryItems), (item, index) => {
        _push(`<div class="aspect-3/4 overflow-hidden rounded-md bg-muted border border-border cursor-pointer group relative" data-v-fd977552><img${ssrRenderAttr("src", item.url)} class="w-full h-full object-cover" loading="lazy" data-v-fd977552></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(galleryItems).length === 0) {
        _push(`<div class="text-center py-40" data-v-fd977552><p class="text-muted-foreground font-medium" data-v-fd977552>Capture the world. Gallery is empty.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(isLightboxOpen)) {
        _push(`<div class="fixed inset-0 z-100 bg-background overflow-hidden select-none transition-colors duration-500" data-v-fd977552><button class="absolute top-10 right-10 z-[120] w-12 h-12 flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground transition-all active:scale-95 shadow-2xl" data-v-fd977552><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-fd977552><line x1="18" y1="6" x2="6" y2="18" data-v-fd977552></line><line x1="6" y1="6" x2="18" y2="18" data-v-fd977552></line></svg></button><div class="relative w-full h-full flex items-center justify-center" data-v-fd977552>`);
        if (!unref(isMobile)) {
          _push(`<button class="absolute left-8 lg:left-24 z-[120] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full text-white transition-all active:scale-90 shadow-xl" data-v-fd977552><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-fd977552><path d="m15 18-6-6 6-6" data-v-fd977552></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(isMobile)) {
          _push(`<button class="absolute right-8 lg:left-24 z-[120] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full text-white transition-all active:scale-90 shadow-xl" style="${ssrRenderStyle({ "left": "auto", "right": "6rem" })}" data-v-fd977552><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-fd977552><path d="m9 18 6-6-6-6" data-v-fd977552></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass([[
          unref(isMobile) ? "overflow-x-auto snap-x snap-mandatory no-scrollbar" : "gap-[var(--carousel-gap)]"
        ], "flex items-center h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] will-change-transform"])}" style="${ssrRenderStyle(!unref(isMobile) ? {
          transform: `translateX(calc(50vw - (var(--card-width) / 2) - (${unref(currentIndex)} * (var(--card-width) + var(--carousel-gap)))))`
        } : {})}" data-v-fd977552><!--[-->`);
        ssrRenderList(unref(galleryItems), (item, index) => {
          _push(`<div${ssrRenderAttr("id", "slide-" + index)} class="${ssrRenderClass([[
            unref(isMobile) ? "w-screen h-full flex items-center justify-center snap-center" : "opacity-40 scale-[0.85]",
            !unref(isMobile) && index === unref(currentIndex) ? "opacity-100 scale-100 z-10" : ""
          ], "relative flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]"])}" style="${ssrRenderStyle(!unref(isMobile) ? { width: "var(--card-width)", height: "75vh" } : {})}" data-v-fd977552><img${ssrRenderAttr("src", item.url)} class="${ssrRenderClass([unref(isMobile) ? "w-[85vw] h-[70vh] rounded-3xl" : "w-full h-full", "object-cover rounded-2xl shadow-2xl border border-white/10 pointer-events-none"])}" data-v-fd977552></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/photos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const photos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fd977552"]]);

export { photos as default };
//# sourceMappingURL=photos-dnNEnPO0.mjs.map
