import { _ as __nuxt_component_0 } from './nuxt-link-CD-o4OdI.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderTeleport } from 'vue/server-renderer';
import { d as useRoute, b as useSeoMeta } from './server.mjs';
import { u as useProjects } from './useProjects-DMPxBFQ8.mjs';
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
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';
import './useSupabaseClient-CkLFOMIR.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { getProjectBySlug, getAdjacentProjects, fetchProjects } = useProjects();
    const isPreloading = ref(true);
    const preloaderProgress = ref(0);
    const terminalLog = ref([]);
    [__temp, __restore] = withAsyncContext(() => fetchProjects()), await __temp, __restore();
    const project = computed(() => getProjectBySlug(route.params.slug));
    const adjacent = computed(() => getAdjacentProjects(route.params.slug));
    const showPrototype = ref(false);
    const formattedLink = computed(() => {
      let raw = project.value?.projectLink || "";
      if (!raw) return "";
      if (raw.includes("<iframe")) {
        const match = raw.match(/src="([^"]+)"/);
        if (match && match[1]) {
          raw = match[1].replace(/&amp;/g, "&");
        }
      }
      let link = raw.trim();
      if (!link.startsWith("http")) link = "https://" + link;
      if (project.value?.isFigma) {
        const isStandardFigma = link.includes("figma.com/") && (link.includes("/file/") || link.includes("/proto/") || link.includes("/design/"));
        const isAlreadyEmbed = link.includes("figma.com/embed");
        if (isStandardFigma && !isAlreadyEmbed) {
          return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(link)}`;
        }
      }
      return link;
    });
    useSeoMeta({
      title: () => project.value ? `${project.value.title} - Lanre Segun` : "Project",
      description: () => project.value?.description || "Case study.",
      ogImage: () => project.value?.coverImage || "/og-image.png"
    });
    watch(() => route.params.slug, () => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50 project-page-container" }, _attrs))} data-v-150b2472>`);
      if (unref(isPreloading)) {
        _push(`<div class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-white font-mono overflow-hidden" data-v-150b2472><div class="terminal-box w-full max-w-2xl border border-white/10 rounded-xl p-8 bg-zinc-950/50 backdrop-blur-xl relative" data-v-150b2472><div class="absolute top-0 left-0 w-full h-1 bg-blue-500/20" data-v-150b2472><div class="h-full bg-blue-500 preloader-progress-bar" style="${ssrRenderStyle({ width: unref(preloaderProgress) + "%" })}" data-v-150b2472></div></div><div class="flex flex-col gap-4" data-v-150b2472><div class="flex justify-between items-center border-b border-white/5 pb-4 mb-2" data-v-150b2472><span class="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500" data-v-150b2472>System.Initialize()</span><span class="text-[10px] uppercase tracking-[0.3em] font-black text-white/20" data-v-150b2472>${ssrInterpolate(Math.floor(unref(preloaderProgress)))}% Complete</span></div><div class="terminal-lines flex flex-col gap-1 overflow-hidden h-32" data-v-150b2472><!--[-->`);
        ssrRenderList(unref(terminalLog), (line, i) => {
          _push(`<p class="text-[10px] md:text-xs leading-relaxed opacity-70 animate-terminal-line" data-v-150b2472><span class="text-blue-500" data-v-150b2472>&gt;</span> ${ssrInterpolate(line)}</p>`);
        });
        _push(`<!--]--></div><div class="flex items-center gap-4 mt-8 opacity-40" data-v-150b2472><div class="grow h-px bg-white/10" data-v-150b2472></div><div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse" data-v-150b2472></div><div class="grow h-px bg-white/10" data-v-150b2472></div></div></div></div><div class="absolute inset-0 z-[-1] opacity-20" data-v-150b2472><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-float" data-v-150b2472></div><div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-float" style="${ssrRenderStyle({ "animation-delay": "-2s" })}" data-v-150b2472></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(project)) {
        _push(`<div class="${ssrRenderClass([{ "opacity-0": unref(isPreloading) }, "max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24 project-content-wrapper"])}" data-v-150b2472><header class="flex flex-col gap-10" data-v-150b2472><div class="flex items-center justify-between entrance-reveal" data-v-150b2472>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          class: "w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-150b2472${_scopeId}><path d="m15 18-6-6 6-6" data-v-150b2472${_scopeId}></path></svg> Back to Projects `);
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
                createTextVNode(" Back to Projects ")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(project).projectLink) {
          _push(`<button class="w-fit flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-bold text-white shadow-lg shadow-blue-500/20" data-v-150b2472>${ssrInterpolate(unref(project).isFigma ? "View Prototype" : "See Live Project")} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-150b2472><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-v-150b2472></path><polyline points="15 3 21 3 21 9" data-v-150b2472></polyline><line x1="10" y1="14" x2="21" y2="3" data-v-150b2472></line></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col gap-6" data-v-150b2472><div class="flex flex-wrap gap-2 entrance-reveal" data-v-150b2472><!--[-->`);
        ssrRenderList(unref(project).tags, (tag) => {
          _push(`<span class="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20 uppercase tracking-widest" data-v-150b2472>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div><h1 class="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-tight overflow-hidden project-title-reveal" data-v-150b2472><!--[-->`);
        ssrRenderList(unref(project).title.split(" "), (word, i) => {
          _push(`<span class="inline-block project-title-word mr-[0.3em]" data-v-150b2472>${ssrInterpolate(word)}</span>`);
        });
        _push(`<!--]--></h1><p class="text-muted-foreground text-xl md:text-2xl font-light max-w-2xl leading-relaxed entrance-reveal" data-v-150b2472>${ssrInterpolate(unref(project).subtitle || unref(project).description)}</p></div><div class="grid grid-cols-2 md:grid-cols-5 gap-8 pt-8 border-t border-white/10 mt-4 meta-grid" data-v-150b2472><!--[-->`);
        ssrRenderList({ Client: unref(project).client, Role: unref(project).role, Industry: unref(project).industry, Duration: unref(project).duration, Team: unref(project).teamSize }, (val, label) => {
          _push(`<div class="flex flex-col gap-1 meta-item" data-v-150b2472><span class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold" data-v-150b2472>${ssrInterpolate(label)}</span><span class="text-sm font-medium truncate" data-v-150b2472>${ssrInterpolate(val || "N/A")}</span></div>`);
        });
        _push(`<!--]--></div></header><div class="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white/5 relative group hero-image-container" data-v-150b2472>`);
        if (unref(project).coverImage || unref(project).content.heroImage) {
          _push(`<img${ssrRenderAttr("src", unref(project).coverImage || unref(project).content.heroImage)}${ssrRenderAttr("alt", unref(project).title)} class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 hero-image-parallax" data-v-150b2472>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" data-v-150b2472></div></div><section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal" data-v-150b2472><div class="md:col-span-4 flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-display font-bold text-blue-500 uppercase tracking-widest" data-v-150b2472>01. Context</h3><h2 class="text-3xl font-display font-bold tracking-tight" data-v-150b2472>The Challenge</h2></div><div class="md:col-span-8 flex flex-col gap-12" data-v-150b2472><p class="text-xl leading-relaxed text-foreground/90 font-light italic border-l-2 border-blue-500 pl-8 py-2" data-v-150b2472> &quot;${ssrInterpolate(unref(project).problemStatement || unref(project).description)}&quot; </p><div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-150b2472><div class="flex flex-col gap-4" data-v-150b2472><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-150b2472>Business Goal</h4><p class="text-muted-foreground leading-relaxed" data-v-150b2472>${ssrInterpolate(unref(project).businessGoal || `Defining
                                objectives for the project revival.`)}</p></div><div class="flex flex-col gap-4" data-v-150b2472><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-150b2472>User Goal</h4><p class="text-muted-foreground leading-relaxed" data-v-150b2472>${ssrInterpolate(unref(project).userGoal || `Prioritizing user
                                needs and experiences.`)}</p></div></div></div></section><section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal" data-v-150b2472><div class="md:col-span-4 flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-150b2472>02. Execution</h3><h2 class="text-3xl font-bold tracking-tight" data-v-150b2472>Design Approach</h2></div><div class="md:col-span-8 flex flex-col gap-12" data-v-150b2472><p class="text-lg leading-relaxed text-muted-foreground" data-v-150b2472>${ssrInterpolate(unref(project).designApproach || unref(project).content.introduction)}</p><div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-8 rounded-2xl border border-white/10" data-v-150b2472><!--[-->`);
        ssrRenderList({ Methods: unref(project).researchMethods, "Target Users": unref(project).targetUsers }, (val, label) => {
          _push(`<div class="flex flex-col gap-4" data-v-150b2472><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-150b2472>${ssrInterpolate(label)}</h4><p class="text-muted-foreground leading-relaxed" data-v-150b2472>${ssrInterpolate(val || "In-depth analysis.")}</p></div>`);
        });
        _push(`<!--]--><div class="flex flex-col gap-4 md:col-span-2 border-t border-white/5 pt-8" data-v-150b2472><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-150b2472>Key Insights</h4><p class="text-muted-foreground leading-relaxed" data-v-150b2472>${ssrInterpolate(unref(project).keyInsights || `Identifying core
                                pain points in workflows.`)}</p></div></div></div></section>`);
        if (unref(project).wireframes?.length) {
          _push(`<section class="flex flex-col gap-10 scroll-reveal" data-v-150b2472><div class="flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-150b2472>03. Iteration</h3><h2 class="text-3xl font-bold tracking-tight" data-v-150b2472>Wireframes &amp; Workflows</h2></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-150b2472><!--[-->`);
          ssrRenderList(unref(project).wireframes, (img, i) => {
            _push(`<div class="rounded-2xl overflow-hidden bg-white/5 aspect-16/10 border border-white/5 group" data-v-150b2472><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover transition-transform group-hover:scale-105" data-v-150b2472></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).finalDesigns?.length) {
          _push(`<section class="flex flex-col gap-10 scroll-reveal" data-v-150b2472><div class="flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-150b2472>04. Visual System</h3><h2 class="text-3xl font-bold tracking-tight" data-v-150b2472>The Final Solution</h2></div><div class="flex flex-col gap-12" data-v-150b2472><!--[-->`);
          ssrRenderList(unref(project).finalDesigns, (img, i) => {
            _push(`<div class="rounded-3xl overflow-hidden bg-white/5 border border-white/10 group" data-v-150b2472><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" data-v-150b2472></div>`);
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).content.sections?.length) {
          _push(`<div class="flex flex-col gap-32 py-20 border-y border-white/5" data-v-150b2472><!--[-->`);
          ssrRenderList(unref(project).content.sections, (section, idx) => {
            _push(`<div class="flex flex-col gap-10 scroll-reveal" data-v-150b2472>`);
            if (section.title) {
              _push(`<div class="flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-150b2472>Process Stage</h3><h2 class="text-3xl font-bold tracking-tight" data-v-150b2472>${ssrInterpolate(section.title)}</h2></div>`);
            } else {
              _push(`<!---->`);
            }
            if (section.layout === "text-only" || !section.layout) {
              _push(`<div class="max-w-3xl" data-v-150b2472><p class="text-lg leading-relaxed text-muted-foreground" data-v-150b2472>${ssrInterpolate(section.content)}</p></div>`);
            } else if (section.layout === "image-full" || section.type === "image") {
              _push(`<div class="w-full flex flex-col gap-8" data-v-150b2472>`);
              if (section.content) {
                _push(`<p class="text-lg leading-relaxed text-muted-foreground max-w-3xl mb-4" data-v-150b2472>${ssrInterpolate(section.content)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group" data-v-150b2472><img${ssrRenderAttr("src", section.image || section.url)} class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" data-v-150b2472></div></div>`);
            } else if (section.layout === "split-left") {
              _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center" data-v-150b2472><div class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group" data-v-150b2472><img${ssrRenderAttr("src", section.image)} class="w-full h-full object-cover transition-transform group-hover:scale-105" data-v-150b2472></div><div class="md:col-span-5 flex flex-col gap-6" data-v-150b2472><p class="text-lg leading-relaxed text-muted-foreground" data-v-150b2472>${ssrInterpolate(section.content)}</p></div></div>`);
            } else if (section.layout === "split-right") {
              _push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center" data-v-150b2472><div class="md:col-span-5 flex flex-col gap-6 order-2 md:order-1" data-v-150b2472><p class="text-lg leading-relaxed text-muted-foreground" data-v-150b2472>${ssrInterpolate(section.content)}</p></div><div class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 order-1 md:order-2 group" data-v-150b2472><img${ssrRenderAttr("src", section.image)} class="w-full h-full object-cover transition-transform group-hover:scale-105" data-v-150b2472></div></div>`);
            } else if (section.layout === "grid" || section.type === "grid") {
              _push(`<div class="flex flex-col gap-8" data-v-150b2472>`);
              if (section.content) {
                _push(`<p class="text-lg leading-relaxed text-muted-foreground max-w-3xl" data-v-150b2472>${ssrInterpolate(section.content)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-150b2472><!--[-->`);
              ssrRenderList(section.images || [], (img, i) => {
                _push(`<div class="rounded-2xl overflow-hidden bg-white/5 aspect-4/3 border border-white/5 group" data-v-150b2472><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-150b2472></div>`);
              });
              _push(`<!--]--></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(project).solutionSummary) {
          _push(`<section class="flex flex-col gap-10 scroll-reveal" data-v-150b2472><div class="flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-bold text-emerald-500 uppercase tracking-widest" data-v-150b2472>The Fix</h3><h2 class="text-3xl font-bold tracking-tight" data-v-150b2472>Solution Summary</h2></div><div class="p-10 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm" data-v-150b2472><p class="text-xl leading-relaxed text-foreground/90 font-light italic pl-4 border-l-2 border-emerald-500" data-v-150b2472> &quot;${ssrInterpolate(unref(project).solutionSummary)}&quot; </p></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal" data-v-150b2472><div class="md:col-span-4 flex flex-col gap-4" data-v-150b2472><h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest" data-v-150b2472>05. Conclusion</h3><h2 class="text-3xl font-bold tracking-tight" data-v-150b2472>The Impact</h2></div><div class="md:col-span-8 flex flex-col gap-12" data-v-150b2472><p class="text-lg leading-relaxed text-muted-foreground" data-v-150b2472>${ssrInterpolate(unref(project).outcome || unref(project).content.results.description)}</p><div class="grid grid-cols-1 md:grid-cols-2 gap-12" data-v-150b2472><div class="flex flex-col gap-4" data-v-150b2472><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-150b2472>Learnings</h4><p class="text-muted-foreground leading-relaxed" data-v-150b2472>${ssrInterpolate(unref(project).learnings || `Iterative testing
                                is key to solving complex UX problems.`)}</p></div><div class="flex flex-col gap-4" data-v-150b2472><h4 class="text-sm font-bold uppercase tracking-widest opacity-40" data-v-150b2472>Tools Used</h4><div class="flex flex-wrap gap-2" data-v-150b2472><!--[-->`);
        ssrRenderList(unref(project).tools, (tool) => {
          _push(`<span class="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-muted-foreground border border-white/5" data-v-150b2472>${ssrInterpolate(tool)}</span>`);
        });
        _push(`<!--]--></div></div></div></div></section><footer class="flex justify-between items-center py-12 border-t border-white/10 mt-12 scroll-reveal" data-v-150b2472>`);
        if (unref(adjacent).prev) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/projects/${unref(adjacent).prev.slug}`,
            class: "flex flex-col gap-1 group text-left max-w-[40%]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" data-v-150b2472${_scopeId}>Previous Project</span><span class="text-xl font-bold group-hover:-translate-x-2 transition-transform truncate" data-v-150b2472${_scopeId}>${ssrInterpolate(unref(adjacent).prev.title)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" }, "Previous Project"),
                  createVNode("span", { class: "text-xl font-bold group-hover:-translate-x-2 transition-transform truncate" }, toDisplayString(unref(adjacent).prev.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="w-1" data-v-150b2472></div>`);
        }
        if (unref(adjacent).next) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/projects/${unref(adjacent).next.slug}`,
            class: "flex flex-col gap-1 group text-right items-end max-w-[40%]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" data-v-150b2472${_scopeId}>Next Project</span><span class="text-xl font-bold group-hover:translate-x-2 transition-transform truncate" data-v-150b2472${_scopeId}>${ssrInterpolate(unref(adjacent).next.title)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold" }, "Next Project"),
                  createVNode("span", { class: "text-xl font-bold group-hover:translate-x-2 transition-transform truncate" }, toDisplayString(unref(adjacent).next.title), 1)
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
        _push(`<div class="h-screen flex items-center justify-center" data-v-150b2472><div class="flex flex-col items-center gap-4" data-v-150b2472><p class="text-muted-foreground" data-v-150b2472>Project not found</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          class: "text-primary hover:underline font-bold uppercase tracking-widest text-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back to Projects `);
            } else {
              return [
                createTextVNode("Back to Projects ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showPrototype) && unref(project)?.projectLink) {
          _push2(`<div class="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-2xl" data-v-150b2472><div class="absolute inset-0 z-0" data-v-150b2472></div><div class="relative w-full h-full max-w-7xl bg-[#1e1e1e] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl animate-modal-in z-10" data-v-150b2472><div class="flex items-center justify-between p-6 border-b border-white/5 bg-[#1A1A1A]" data-v-150b2472><div class="flex flex-col" data-v-150b2472><h3 class="text-lg font-bold text-white uppercase tracking-tighter" data-v-150b2472>${ssrInterpolate(unref(project).title)} Prototype</h3><p class="text-[10px] text-white/40 uppercase tracking-widest" data-v-150b2472>Interactive Cloud Preview </p></div><button class="p-3 hover:bg-white/5 rounded-full transition-all hover:rotate-90 text-white/50 hover:text-white" data-v-150b2472><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-150b2472><line x1="18" y1="6" x2="6" y2="18" data-v-150b2472></line><line x1="6" y1="6" x2="18" y2="18" data-v-150b2472></line></svg></button></div><div class="flex-1 w-full relative bg-black flex items-center justify-center overflow-hidden" data-v-150b2472><div class="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0" data-v-150b2472><div class="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" data-v-150b2472></div><p class="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black" data-v-150b2472>Initializing Simulation</p></div>`);
          if (unref(formattedLink)) {
            _push2(`<iframe${ssrRenderAttr("src", unref(formattedLink))} class="absolute inset-0 w-full h-full border-0 z-10" allow="autoplay; clipboard-write; draw-viewer; encrypted-media; fullscreen; picture-in-picture" allowfullscreen loading="lazy" data-v-150b2472></iframe>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
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
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-150b2472"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-BjcRhT5E.mjs.map
