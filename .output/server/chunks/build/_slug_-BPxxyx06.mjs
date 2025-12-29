import { _ as __nuxt_component_0 } from './nuxt-link-COIQhOYk.mjs';
import { defineComponent, computed, watch, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { b as useRoute, u as useHead } from './server.mjs';
import { u as useProjects } from './useProjects-BJGTM40K.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { getProjectBySlug, getAdjacentProjects } = useProjects();
    const project = computed(() => getProjectBySlug(route.params.slug));
    const adjacent = computed(() => getAdjacentProjects(route.params.slug));
    useHead({
      title: computed(() => project.value ? `${project.value.title} - Lanre Segun` : "Project Not Found"),
      meta: [
        { name: "description", content: computed(() => project.value?.description || "") }
      ]
    });
    watch(() => route.params.slug, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50" }, _attrs))} data-v-33b88cf3>`);
      if (unref(project)) {
        _push(`<div class="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 md:gap-20" data-v-33b88cf3><header class="flex flex-col gap-8 animate-fade-in-up" data-v-33b88cf3>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          class: "w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-33b88cf3${_scopeId}><path d="m15 18-6-6 6-6" data-v-33b88cf3${_scopeId}></path></svg> Projects `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  createVNode("path", { d: "m15 18-6-6 6-6" })
                ])),
                createTextVNode(" Projects ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex flex-col gap-4" data-v-33b88cf3><h1 class="text-4xl md:text-5xl font-bold tracking-tight" data-v-33b88cf3>${ssrInterpolate(unref(project).title)}</h1><p class="text-muted-foreground text-lg" data-v-33b88cf3>${ssrInterpolate(unref(project).date)}</p></div></header><div class="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up delay-100 bg-white/5" data-v-33b88cf3>`);
        if (unref(project).content.heroImage) {
          _push(`<img${ssrRenderAttr("src", unref(project).content.heroImage)}${ssrRenderAttr("alt", unref(project).title)} class="w-full h-full object-cover" data-v-33b88cf3>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><article class="flex flex-col gap-16 animate-fade-in-up delay-200" data-v-33b88cf3><div class="flex flex-col items-start gap-8" data-v-33b88cf3><p class="text-xl md:text-2xl leading-relaxed font-light text-foreground/90 max-w-3xl" data-v-33b88cf3>${ssrInterpolate(unref(project).content.introduction)}</p></div><!--[-->`);
        ssrRenderList(unref(project).content.sections, (section, idx) => {
          _push(`<div class="flex flex-col gap-8" data-v-33b88cf3>`);
          if (section.type === "image") {
            _push(`<div class="w-full aspect-video rounded-xl overflow-hidden bg-white/5 relative group" data-v-33b88cf3><img${ssrRenderAttr("src", section.image)}${ssrRenderAttr("alt", section.caption || "Project details")} class="w-full h-full object-cover" data-v-33b88cf3>`);
            if (section.caption) {
              _push(`<p class="absolute bottom-4 left-4 text-xs font-medium text-white/50 bg-black/50 px-2 py-1 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" data-v-33b88cf3>${ssrInterpolate(section.caption)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (section.type === "text") {
            _push(`<p class="text-lg leading-relaxed text-muted-foreground max-w-2xl" data-v-33b88cf3>${ssrInterpolate(section.content)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (section.type === "grid") {
            _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-33b88cf3><!--[-->`);
            ssrRenderList(section.images, (img, i) => {
              _push(`<div class="rounded-xl overflow-hidden bg-white/5 aspect-[4/3]" data-v-33b88cf3><img${ssrRenderAttr("src", img)} alt="Project detail" class="w-full h-full object-cover" data-v-33b88cf3></div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><div class="mt-8 pt-12 border-t border-white/10" data-v-33b88cf3><h3 class="text-2xl font-bold mb-8" data-v-33b88cf3>Results</h3><p class="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl" data-v-33b88cf3>${ssrInterpolate(unref(project).content.results.description)}</p><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-33b88cf3><!--[-->`);
        ssrRenderList(unref(project).content.results.metrics, (metric, mIdx) => {
          _push(`<div class="p-6 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-2" data-v-33b88cf3><span class="text-sm text-muted-foreground font-medium uppercase tracking-wider" data-v-33b88cf3>${ssrInterpolate(metric.label)}</span><span class="text-3xl font-bold text-white" data-v-33b88cf3>${ssrInterpolate(metric.value)}</span></div>`);
        });
        _push(`<!--]--></div></div></article><footer class="flex justify-between items-center py-12 border-t border-white/10 mt-12" data-v-33b88cf3>`);
        if (unref(adjacent).prev) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/projects/${unref(adjacent).prev.slug}`,
            class: "flex flex-col gap-1 group text-left"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-muted-foreground group-hover:text-primary transition-colors" data-v-33b88cf3${_scopeId}>Previous</span><span class="text-lg font-medium group-hover:translate-x-1 transition-transform" data-v-33b88cf3${_scopeId}>${ssrInterpolate(unref(adjacent).prev.title)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-muted-foreground group-hover:text-primary transition-colors" }, "Previous"),
                  createVNode("span", { class: "text-lg font-medium group-hover:translate-x-1 transition-transform" }, toDisplayString(unref(adjacent).prev.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="w-1" data-v-33b88cf3></div>`);
        }
        if (unref(adjacent).next) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/projects/${unref(adjacent).next.slug}`,
            class: "flex flex-col gap-1 group text-right items-end"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-muted-foreground group-hover:text-primary transition-colors" data-v-33b88cf3${_scopeId}>Next</span><span class="text-lg font-medium group-hover:-translate-x-1 transition-transform" data-v-33b88cf3${_scopeId}>${ssrInterpolate(unref(adjacent).next.title)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-muted-foreground group-hover:text-primary transition-colors" }, "Next"),
                  createVNode("span", { class: "text-lg font-medium group-hover:-translate-x-1 transition-transform" }, toDisplayString(unref(adjacent).next.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</footer></div>`);
      } else {
        _push(`<div class="h-screen flex items-center justify-center" data-v-33b88cf3><div class="flex flex-col items-center gap-4" data-v-33b88cf3><p class="text-muted-foreground" data-v-33b88cf3>Project not found</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          class: "text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Projects`);
            } else {
              return [
                createTextVNode("Back to Projects")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/projects/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-33b88cf3"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BPxxyx06.mjs.map
