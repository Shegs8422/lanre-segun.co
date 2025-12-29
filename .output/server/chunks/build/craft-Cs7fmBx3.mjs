import { defineComponent, mergeProps, ref, unref, withCtx, createBlock, createCommentVNode, openBlock, createVNode, computed, watch, shallowRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-COIQhOYk.mjs';
import { u as useHead, a as useTheme, b as useRoute } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const currentPlayingId = ref(null);
const currentTrack = ref(null);
const currentSound = ref(null);
const volume = ref(0.7);
const isSoundEnabled = ref(true);
const useAlbumPlayer = () => {
  const isPlaying = (id) => {
    return currentPlayingId.value === id;
  };
  const playTrack = (track) => {
    if (currentSound.value) {
      currentSound.value.stop();
    }
    currentTrack.value = track;
    currentPlayingId.value = track.id;
  };
  const pauseTrack = () => {
    if (currentSound.value) {
      currentSound.value.stop();
    }
    currentPlayingId.value = null;
  };
  const stopTrack = () => {
    if (currentSound.value) {
      currentSound.value.stop();
    }
    currentPlayingId.value = null;
    currentTrack.value = null;
    currentSound.value = null;
  };
  const setCurrentSound = (sound) => {
    currentSound.value = sound;
  };
  const toggleSound = () => {
    isSoundEnabled.value = !isSoundEnabled.value;
    if (!isSoundEnabled.value && currentSound.value) {
      currentSound.value.stop();
      currentPlayingId.value = null;
      currentTrack.value = null;
      currentSound.value = null;
    }
  };
  return {
    currentPlayingId: computed(() => currentPlayingId.value),
    currentTrack: computed(() => currentTrack.value),
    volume: computed(() => volume.value),
    isSoundEnabled: computed(() => isSoundEnabled.value),
    isPlaying,
    playTrack,
    pauseTrack,
    stopTrack,
    setCurrentSound,
    setVolume: (val) => {
      volume.value = val;
    },
    toggleSound
  };
};
const useClientSound = (src, options = {}) => {
  const isPlaying = ref(false);
  const duration = ref(null);
  const sound = shallowRef(null);
  const init = () => {
    if (sound.value || true) return;
  };
  if (options.eager && false) ;
  const play = (opts) => {
    console.log("[useClientSound] Play requested for:", src);
    if (!sound.value) init();
    if (sound.value) {
      if (options.interrupt) {
        sound.value.stop();
      }
      sound.value.play();
    }
  };
  const stop = () => {
    sound.value?.stop();
  };
  const pause = () => {
    sound.value?.pause();
  };
  const setVolume = (vol) => {
    if (sound.value) {
      sound.value.volume(vol);
    }
  };
  return {
    play,
    stop,
    pause,
    setVolume,
    isPlaying,
    duration,
    sound
  };
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FloatingDock",
  __ssrInlineRender: true,
  props: {
    demo: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { isDark } = useTheme();
    const route = useRoute();
    const activeDemoTab = ref("/");
    const { currentTrack: currentTrack2, isSoundEnabled: isSoundEnabled2 } = useAlbumPlayer();
    const interactionSound = useClientSound("/audio/interaction-sound.mp3", {
      eager: true
    });
    const isActive = (path) => {
      if (props.demo) return activeDemoTab.value === path;
      if (path === "/") return route?.path === "/";
      return route?.path.startsWith(path);
    };
    const playInteraction = () => {
      interactionSound.play();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          __props.demo ? "relative flex justify-center" : "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4"
        ]
      }, _attrs))} data-v-cfeee997>`);
      if (unref(route).path === "/" && !__props.demo) {
        _push(`<div class="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] text-white rounded-full text-xs font-medium animate-bounce shadow-lg border border-white/10" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5" data-v-cfeee997><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M15 19l-3 3-3-3M2 12h20M12 2v20" data-v-cfeee997></path></svg><span data-v-cfeee997>Drag to move</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative" data-v-cfeee997>`);
      if (unref(currentTrack2)) {
        _push(`<div class="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex items-center gap-3 px-3 py-2 rounded-2xl bg-white dark:bg-[#1A1A1A] text-black dark:text-white shadow-2xl transition-colors duration-300 border border-black/5 dark:border-white/10" data-v-cfeee997><div class="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" data-v-cfeee997><img${ssrRenderAttr("src", unref(currentTrack2).albumCover)}${ssrRenderAttr("alt", unref(currentTrack2).albumTitle)} class="w-full h-full object-cover" data-v-cfeee997></div><div class="flex flex-col min-w-0 max-w-[180px]" data-v-cfeee997><p class="text-sm font-medium truncate" data-v-cfeee997>${ssrInterpolate(unref(currentTrack2).albumTitle)}</p><p class="text-xs text-black/60 dark:text-white/60 truncate" data-v-cfeee997>${ssrInterpolate(unref(currentTrack2).artist)}</p></div><button class="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors group relative flex-shrink-0" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5" data-v-cfeee997><line x1="18" y1="6" x2="6" y2="18" data-v-cfeee997></line><line x1="6" y1="6" x2="18" y2="18" data-v-cfeee997></line></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full px-2 py-2 bg-component border scrollbar-none overflow-y-hidden overflow-x-auto sm:overflow-visible rounded-2xl w-fit flex h-[3.5rem] items-center gap-2 relative z-10 shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)] max-w-[95vw]" style="${ssrRenderStyle({ "will-change": "auto", "transform": "none" })}" data-v-cfeee997>`);
      if (!__props.demo) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          onClick: playInteraction,
          class: ["shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative", isActive("/") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997${_scopeId}><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9.5 16.5V20H6a2 2 0 0 1-2-2v-7.948a2 2 0 0 1 .867-1.648l6-4.125a2 2 0 0 1 2.266 0l6 4.125A2 2 0 0 1 20 10.052V18a2 2 0 0 1-2 2h-3.5v-3.5a2.5 2.5 0 0 0-5 0Z" data-v-cfeee997${_scopeId}></path></svg>`);
              if (isActive("/")) {
                _push2(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997${_scopeId}>Home</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  class: "h-5 w-5 shrink-0 relative z-10"
                }, [
                  createVNode("path", {
                    stroke: "currentColor",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9.5 16.5V20H6a2 2 0 0 1-2-2v-7.948a2 2 0 0 1 .867-1.648l6-4.125a2 2 0 0 1 2.266 0l6 4.125A2 2 0 0 1 20 10.052V18a2 2 0 0 1-2 2h-3.5v-3.5a2.5 2.5 0 0 0-5 0Z"
                  })
                ])),
                isActive("/") ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-2 font-medium text-sm whitespace-nowrap"
                }, "Home")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="${ssrRenderClass([isActive("/") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]", "shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"])}" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9.5 16.5V20H6a2 2 0 0 1-2-2v-7.948a2 2 0 0 1 .867-1.648l6-4.125a2 2 0 0 1 2.266 0l6 4.125A2 2 0 0 1 20 10.052V18a2 2 0 0 1-2 2h-3.5v-3.5a2.5 2.5 0 0 0-5 0Z" data-v-cfeee997></path></svg>`);
        if (isActive("/")) {
          _push(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997>Home</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (!__props.demo) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/projects",
          onClick: playInteraction,
          class: ["shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative", isActive("/projects") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12 4.5 7.781m7.5 4.22v8.5m0-8.5 7.5-4.22m.5.889v6.66a2 2 0 0 1-1.02 1.744l-6 3.375a2 2 0 0 1-1.96 0l-6-3.375A2 2 0 0 1 4 15.33V8.67a2 2 0 0 1 1.02-1.743l6-3.375a2 2 0 0 1 1.96 0l6 3.375A2 2 0 0 1 20 8.67" data-v-cfeee997${_scopeId}></path></svg>`);
              if (isActive("/projects")) {
                _push2(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997${_scopeId}>Projects</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  class: "h-5 w-5 shrink-0 relative z-10"
                }, [
                  createVNode("path", {
                    stroke: "currentColor",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 12 4.5 7.781m7.5 4.22v8.5m0-8.5 7.5-4.22m.5.889v6.66a2 2 0 0 1-1.02 1.744l-6 3.375a2 2 0 0 1-1.96 0l-6-3.375A2 2 0 0 1 4 15.33V8.67a2 2 0 0 1 1.02-1.743l6-3.375a2 2 0 0 1 1.96 0l6 3.375A2 2 0 0 1 20 8.67"
                  })
                ])),
                isActive("/projects") ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-2 font-medium text-sm whitespace-nowrap"
                }, "Projects")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="${ssrRenderClass([isActive("/projects") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]", "shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"])}" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12 4.5 7.781m7.5 4.22v8.5m0-8.5 7.5-4.22m.5.889v6.66a2 2 0 0 1-1.02 1.744l-6 3.375a2 2 0 0 1-1.96 0l-6-3.375A2 2 0 0 1 4 15.33V8.67a2 2 0 0 1 1.02-1.743l6-3.375a2 2 0 0 1 1.96 0l6 3.375A2 2 0 0 1 20 8.67" data-v-cfeee997></path></svg>`);
        if (isActive("/projects")) {
          _push(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997>Projects</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (!__props.demo) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/craft",
          onClick: playInteraction,
          class: ["shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative", isActive("/craft") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997${_scopeId}><path d="M6.70694 14.7929C6.31641 15.1834 5.68325 15.1834 5.29272 14.7929L2.45696 11.9571C2.06643 11.5666 2.06643 10.9334 2.45696 10.5429L9.70694 3.29289C9.89447 3.10536 10.1488 3 10.414 3L14.0857 3C14.3509 3 14.6052 3.10536 14.7928 3.29289L15.7927 4.29286C16.1832 4.68338 16.1832 5.31655 15.7927 5.70707L6.70694 14.7929Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cfeee997${_scopeId}></path><path d="M9.5 12.5L16.3358 19.3358C17.1168 20.1168 18.3832 20.1168 19.1642 19.3358L19.3358 19.1642C20.1168 18.3832 20.1168 17.1168 19.3358 16.3358L12.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cfeee997${_scopeId}></path></svg>`);
              if (isActive("/craft")) {
                _push2(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997${_scopeId}>Craft</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  class: "h-5 w-5 shrink-0 relative z-10"
                }, [
                  createVNode("path", {
                    d: "M6.70694 14.7929C6.31641 15.1834 5.68325 15.1834 5.29272 14.7929L2.45696 11.9571C2.06643 11.5666 2.06643 10.9334 2.45696 10.5429L9.70694 3.29289C9.89447 3.10536 10.1488 3 10.414 3L14.0857 3C14.3509 3 14.6052 3.10536 14.7928 3.29289L15.7927 4.29286C16.1832 4.68338 16.1832 5.31655 15.7927 5.70707L6.70694 14.7929Z",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createVNode("path", {
                    d: "M9.5 12.5L16.3358 19.3358C17.1168 20.1168 18.3832 20.1168 19.1642 19.3358L19.3358 19.1642C20.1168 18.3832 20.1168 17.1168 19.3358 16.3358L12.5 9.5",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ])),
                isActive("/craft") ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-2 font-medium text-sm whitespace-nowrap"
                }, "Craft")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="${ssrRenderClass([isActive("/craft") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]", "shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"])}" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997><path d="M6.70694 14.7929C6.31641 15.1834 5.68325 15.1834 5.29272 14.7929L2.45696 11.9571C2.06643 11.5666 2.06643 10.9334 2.45696 10.5429L9.70694 3.29289C9.89447 3.10536 10.1488 3 10.414 3L14.0857 3C14.3509 3 14.6052 3.10536 14.7928 3.29289L15.7927 4.29286C16.1832 4.68338 16.1832 5.31655 15.7927 5.70707L6.70694 14.7929Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cfeee997></path><path d="M9.5 12.5L16.3358 19.3358C17.1168 20.1168 18.3832 20.1168 19.1642 19.3358L19.3358 19.1642C20.1168 18.3832 20.1168 17.1168 19.3358 16.3358L12.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cfeee997></path></svg>`);
        if (isActive("/craft")) {
          _push(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997>Craft</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (!__props.demo) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/notes",
          onClick: playInteraction,
          class: ["shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative", isActive("/notes") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2H9m0-17h8.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9m0-17v17M13 8h2.5M13 12h2.5" data-v-cfeee997${_scopeId}></path></svg>`);
              if (isActive("/notes")) {
                _push2(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997${_scopeId}>Notes</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  class: "h-5 w-5 shrink-0 relative z-10"
                }, [
                  createVNode("path", {
                    stroke: "currentColor",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2H9m0-17h8.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9m0-17v17M13 8h2.5M13 12h2.5"
                  })
                ])),
                isActive("/notes") ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-2 font-medium text-sm whitespace-nowrap"
                }, "Notes")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="${ssrRenderClass([isActive("/notes") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]", "shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"])}" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2H9m0-17h8.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9m0-17v17M13 8h2.5M13 12h2.5" data-v-cfeee997></path></svg>`);
        if (isActive("/notes")) {
          _push(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997>Notes</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (!__props.demo) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/photos",
          onClick: playInteraction,
          class: ["shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative", isActive("/photos") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997${_scopeId}><path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M5 7h1.43a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.57 4h2.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 17.57 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" data-v-cfeee997${_scopeId}></path><path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-cfeee997${_scopeId}></path></svg>`);
              if (isActive("/photos")) {
                _push2(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997${_scopeId}>Gallery</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  class: "h-5 w-5 shrink-0 relative z-10"
                }, [
                  createVNode("path", {
                    stroke: "currentColor",
                    "stroke-linecap": "square",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5 7h1.43a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.57 4h2.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 17.57 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
                  }),
                  createVNode("path", {
                    stroke: "currentColor",
                    "stroke-linecap": "square",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  })
                ])),
                isActive("/photos") ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-2 font-medium text-sm whitespace-nowrap"
                }, "Gallery")) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="${ssrRenderClass([isActive("/photos") ? "w-auto px-4 bg-secondary text-secondary-foreground" : "w-10 px-[10px]", "shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"])}" data-v-cfeee997><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 relative z-10" data-v-cfeee997><path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M5 7h1.43a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.57 4h2.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 17.57 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" data-v-cfeee997></path><path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-cfeee997></path></svg>`);
        if (isActive("/photos")) {
          _push(`<span class="ml-2 font-medium text-sm whitespace-nowrap" data-v-cfeee997>Gallery</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`<div data-orientation="vertical" role="none" class="shrink-0 bg-border h-full w-[1px] mx-1.5" data-v-cfeee997></div><button class="whitespace-nowrap text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground shrink-0 aspect-square w-[2.5rem] h-[2.5rem] bg-component&#39; rounded-xl relative flex items-center justify-center undefined" aria-label="Toggle Theme" data-state="closed" data-v-cfeee997>`);
      if (unref(isDark)) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5" data-v-cfeee997><path d="M12 3V2M12 22V21M18.3598 5.64005L19.0698 4.93005M4.93016 19.07L5.64016 18.36M21 12H22M2 12H3M18.3598 18.36L19.0698 19.07M4.93016 4.93005L5.64016 5.64005M15.5355 8.46447C17.4882 10.4171 17.4882 13.5829 15.5355 15.5355C13.5829 17.4882 10.4171 17.4882 8.46447 15.5355C6.51185 13.5829 6.51185 10.4171 8.46447 8.46447C10.4171 6.51185 13.5829 6.51185 15.5355 8.46447Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cfeee997></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5" data-v-cfeee997><path d="M20.9638 12.7674C19.8361 13.5447 18.4693 13.9998 16.9961 13.9998C13.1301 13.9998 9.99609 10.8657 9.99609 6.99975C9.99609 5.52667 10.4511 4.15987 11.2283 3.03223C6.61911 3.42277 3 7.28768 3 11.9979C3 16.9674 7.0286 20.996 11.9981 20.996C16.7084 20.996 20.5734 17.3767 20.9638 12.7674Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-cfeee997></path></svg>`);
      }
      _push(`</button><button class="whitespace-nowrap text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground shrink-0 aspect-square w-[2.5rem] h-[2.5rem] bg-component rounded-xl relative flex items-center justify-center audio-toggle-button" aria-label="Toggle Audio" data-state="closed" data-v-cfeee997>`);
      if (unref(isSoundEnabled2)) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5" data-v-cfeee997><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.071 4.92968C20.8807 6.73932 22 9.23932 22 12.0007C22 14.7622 20.8807 17.2622 19.071 19.0718M15.8891 8.11132C16.8844 9.10662 17.5 10.4816 17.5 12.0004C17.5 13.5192 16.8844 14.8942 15.8891 15.8895M4 7.99999H5.33333C5.76607 7.99999 6.18714 7.85964 6.53333 7.59999L11.2 4.09999C11.5296 3.85278 12 4.08797 12 4.49999V19.5C12 19.912 11.5296 20.1472 11.2 19.9L6.53333 16.4C6.18714 16.1403 5.76607 16 5.33333 16H4C2.89543 16 2 15.1046 2 14V9.99999C2 8.89542 2.89543 7.99999 4 7.99999Z" data-v-cfeee997></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5" data-v-cfeee997><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.5 10-2.121 2.121m0 0-2.122 2.121m2.122-2.12L17.257 10m2.122 2.121 2.121 2.121M4 8h1.333a2 2 0 0 0 1.2-.4L11.2 4.1a.5.5 0 0 1 .8.4v15a.5.5 0 0 1-.8.4l-4.667-3.5a2 2 0 0 0-1.2-.4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z" data-v-cfeee997></path></svg>`);
      }
      _push(`</button></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FloatingDock.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const FloatingDock = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-cfeee997"]]), { __name: "FloatingDock" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "FlipClock",
  __ssrInlineRender: true,
  setup(__props) {
    const digits = ref([
      { current: 0, previous: -1 },
      // H1
      { current: 0, previous: -1 },
      // H2
      { current: 0, previous: -1 },
      // M1
      { current: 0, previous: -1 },
      // M2
      { current: 0, previous: -1 },
      // S1
      { current: 0, previous: -1 }
      // S2
    ]);
    const containerRef = ref(null);
    const getDigitClass = (digitIndex, value) => {
      const digitState = digits.value[digitIndex];
      if (digitState.current === value) return "current";
      if (digitState.previous === value) return "previous";
      return "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flip-clock-container",
        ref_key: "containerRef",
        ref: containerRef
      }, _attrs))} data-v-331432fd><div class="countdown flex gap-8 items-center" data-v-331432fd><div class="flex gap-1" data-v-331432fd><ul class="flip" data-v-331432fd><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(0, n - 1))}" data-v-331432fd><span data-v-331432fd><div class="up" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul><ul class="flip" data-v-331432fd><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(1, n - 1))}" data-v-331432fd><span data-v-331432fd><div class="up" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex gap-1" data-v-331432fd><ul class="flip" data-v-331432fd><!--[-->`);
      ssrRenderList(6, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(2, n - 1))}" data-v-331432fd><span data-v-331432fd><div class="up" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul><ul class="flip" data-v-331432fd><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(3, n - 1))}" data-v-331432fd><span data-v-331432fd><div class="up" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex gap-1" data-v-331432fd><ul class="flip" data-v-331432fd><!--[-->`);
      ssrRenderList(6, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(4, n - 1))}" data-v-331432fd><span data-v-331432fd><div class="up" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul><ul class="flip" data-v-331432fd><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(5, n - 1))}" data-v-331432fd><span data-v-331432fd><div class="up" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-331432fd><div class="shadow" data-v-331432fd></div><div class="inn" data-v-331432fd>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/FlipClock.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const FlipClock = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-331432fd"]]), { __name: "WidgetsFlipClock" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Book3D",
  __ssrInlineRender: true,
  props: {
    cover: {},
    color: {},
    width: {},
    height: {},
    classes: {},
    stagger: {},
    title: {},
    author: {}
  },
  setup(__props) {
    const isHovering = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["absolute select-none pointer-events-auto", __props.classes],
        style: { "--stagger": __props.stagger, perspective: "1200px" }
      }, _attrs))} data-v-c9d5784c><div class="group relative transition-all duration-500 ease-out hover:-translate-y-6 hover:shadow-2xl" style="${ssrRenderStyle({ width: __props.width + "px", height: __props.height + "px", transformStyle: "preserve-3d" })}" data-v-c9d5784c><div class="absolute top-0 bottom-0 w-[12px] bg-gray-200 border-l border-gray-300 transform -translate-x-[6px] translate-z-[-6px] rotate-y-90 origin-right rounded-l-sm" style="${ssrRenderStyle({ backgroundColor: __props.color, height: __props.height + "px", left: "0px" })}" data-v-c9d5784c></div><div class="absolute inset-0 bg-card rounded-r-sm shadow-md overflow-hidden transition-transform duration-500 origin-left group-hover:rotate-y-[-45deg] z-20" style="${ssrRenderStyle({ "backface-visibility": "hidden", "transform-style": "preserve-3d" })}" data-v-c9d5784c><img${ssrRenderAttr("src", __props.cover)}${ssrRenderAttr("width", __props.width)}${ssrRenderAttr("height", __props.height)} class="w-full h-full object-cover" alt="Book Cover" data-v-c9d5784c><div class="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-r from-white/40 to-transparent pointer-events-none" data-v-c9d5784c></div></div><div class="absolute inset-0 bg-[#fff] rounded-r-sm shadow-inner z-10 flex items-center justify-center overflow-hidden" data-v-c9d5784c><div class="w-3/4 flex flex-col gap-1 opacity-20" data-v-c9d5784c><div class="h-1 w-full bg-black rounded-full" data-v-c9d5784c></div><div class="h-1 w-5/6 bg-black rounded-full" data-v-c9d5784c></div><div class="h-1 w-full bg-black rounded-full" data-v-c9d5784c></div><div class="h-1 w-4/6 bg-black rounded-full" data-v-c9d5784c></div></div></div><div class="absolute top-[3px] bottom-[3px] right-0 w-[12px] bg-white border border-gray-200 transform translate-x-[6px] translate-z-[-6px] rotate-y-90 origin-left" style="${ssrRenderStyle({ "background": "repeating-linear-gradient(90deg, #fff, #fff 1px, #f0f0f0 1px, #f0f0f0 2px)" })}" data-v-c9d5784c></div><div class="absolute inset-0 rounded-r-sm transform translate-z-[-12px]" style="${ssrRenderStyle({ backgroundColor: __props.color })}" data-v-c9d5784c></div><div class="${ssrRenderClass([isHovering.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2", "absolute -bottom-20 left-1/2 -translate-x-1/2 w-max max-w-[200px] z-30 pointer-events-none transition-all duration-300 transform"])}" data-v-c9d5784c><div class="bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl flex flex-col items-center border border-white/10" data-v-c9d5784c><p class="text-sm font-bold text-center leading-tight" data-v-c9d5784c>${ssrInterpolate(__props.title || "Book Title")}</p><p class="text-xs text-white/60 text-center mt-0.5" data-v-c9d5784c>${ssrInterpolate(__props.author || "Author Name")}</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/Book3D.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Book3D = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-c9d5784c"]]), { __name: "WidgetsBook3D" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DrawingCanvas",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    ref(null);
    ref(false);
    ref(0);
    ref(0);
    const colors = [
      "#A855F7",
      "#F97316",
      "#22C55E",
      "#EAB308",
      "#EF4444",
      "#3B82F6",
      "#84CC16"
    ];
    const activeColor = ref(colors[0]);
    const isPaletteOpen = ref(false);
    (void 0).matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full mx-auto border-4 border-[#CEB990] bg-[#ECDDC0] rounded-lg shadow-sm overflow-hidden select-none" }, _attrs))} data-v-25f4cdb2><canvas class="${ssrRenderClass([
        "absolute inset-0 w-full h-full touch-none cursor-crosshair"
      ])}" data-v-25f4cdb2></canvas><div class="absolute bottom-4 right-4 flex flex-col gap-2 items-end z-10" data-v-25f4cdb2><div class="flex flex-col-reverse gap-2 items-center" data-v-25f4cdb2><button class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95" style="${ssrRenderStyle({ backgroundColor: activeColor.value })}" data-v-25f4cdb2></button>`);
      if (isPaletteOpen.value) {
        _push(`<div class="flex flex-col gap-2 mb-2 animate-in" data-v-25f4cdb2><!--[-->`);
        ssrRenderList(colors, (color) => {
          _push(`<button class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95" style="${ssrRenderStyle({ backgroundColor: color })}" data-v-25f4cdb2></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="w-10 h-10 rounded-md bg-white shadow-sm hover:scale-110 active:scale-95 flex items-center justify-center" title="Clear board" data-v-25f4cdb2> 🧽 </button></div><svg viewBox="0 0 600 200" class="hidden" data-v-25f4cdb2><path d="
          M20 120
          C40 140, 60 140, 70 120
          C80 80, 90 60, 110 70
          C130 80, 120 120, 110 130

          C100 150, 140 150, 150 120
          C160 90, 170 70, 190 80
          C210 90, 200 140, 180 140

          C170 140, 230 150, 240 120
          C250 90, 260 70, 280 80
          C300 90, 290 140, 270 140

          C260 140, 320 150, 330 120
          C340 90, 350 70, 370 80
          C390 90, 380 140, 360 140

          C360 140, 420 160, 460 120
          C500 80, 520 80, 540 100
        " data-v-25f4cdb2></path></svg></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/DrawingCanvas.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const DrawingCanvas = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-25f4cdb2"]]), { __name: "WidgetsDrawingCanvas" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "VinylRecord",
  __ssrInlineRender: true,
  props: {
    cover: {},
    label: {},
    album: {},
    artist: {},
    musicFile: {},
    colStart: {},
    rowStart: {},
    rotation: {},
    x: {},
    y: {},
    classes: {}
  },
  setup(__props) {
    const props = __props;
    const {
      isPlaying: isPlayingGlobal,
      stopTrack,
      volume: volume2
    } = useAlbumPlayer();
    const isHovering = ref(false);
    const rotation = ref(0);
    const animationFrameId = ref(null);
    const albumId = computed(
      () => `${props.album}-${props.artist}-${props.musicFile}`.replace(/\s+/g, "-").toLowerCase()
    );
    const isPlaying = computed(() => isPlayingGlobal(albumId.value));
    const audioControls = props.musicFile ? useClientSound(props.musicFile, {
      volume: volume2.value
    }) : null;
    if (audioControls) {
      watch(audioControls.isPlaying, (playing) => {
        if (!playing && props.musicFile) {
          stopTrack();
          if (animationFrameId.value) {
            cancelAnimationFrame(animationFrameId.value);
            animationFrameId.value = null;
          }
          rotation.value = 0;
        }
      });
      watch(volume2, (newVolume) => {
        audioControls.setVolume(newVolume);
      });
    }
    const animate = () => {
      if (isPlaying.value) {
        rotation.value = (rotation.value + 1) % 360;
        animationFrameId.value = requestAnimationFrame(animate);
      }
    };
    watch(isPlaying, (playing) => {
      if (playing) {
        if (!animationFrameId.value) {
          animate();
        }
      } else {
        if (animationFrameId.value) {
          cancelAnimationFrame(animationFrameId.value);
          animationFrameId.value = null;
        }
        rotation.value = 0;
      }
    });
    const positionStyle = computed(() => {
      const styles = {};
      if (props.rotation) {
        styles.transform = `rotate(${props.rotation}deg)`;
      }
      if (props.x !== void 0) {
        styles.left = `${props.x}px`;
      }
      if (props.y !== void 0) {
        styles.top = `${props.y}px`;
      }
      return styles;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["select-none w-fit h-fit relative cursor-pointer", __props.classes],
        style: unref(positionStyle)
      }, _attrs))}><div class="relative w-48 h-48"><div class="relative w-full h-full"><div class="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl" style="${ssrRenderStyle({
        transform: unref(isPlaying) ? "rotate(" + unref(rotation) + "deg)" : "rotate(0deg)",
        transition: "none"
      })}"><div class="absolute inset-2 rounded-full border border-gray-700/30"></div><div class="absolute inset-4 rounded-full border border-gray-700/20"></div><div class="absolute inset-6 rounded-full border border-gray-700/20"></div><div class="absolute inset-8 rounded-full border border-gray-700/20"></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-800 overflow-hidden border-2 border-red-900"><img${ssrRenderAttr("alt", `${__props.artist || __props.album} center`)} width="80" height="80"${ssrRenderAttr("src", __props.label || __props.cover)} class="w-full h-full object-cover"><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/50"></div></div></div><div class="absolute inset-0 rounded-lg overflow-hidden shadow-lg transition-all duration-600 ease-in-out" style="${ssrRenderStyle({
        transform: unref(isPlaying) ? "translateX(45%)" : "translateX(0)"
      })}"><img${ssrRenderAttr("alt", `${__props.album} by ${__props.artist}`)} width="216" height="216"${ssrRenderAttr("src", __props.cover)} class="w-full h-full object-cover"><div class="absolute inset-0 bg-black/20 transition-opacity duration-300" style="${ssrRenderStyle({ opacity: unref(isPlaying) ? 1 : 0 })}"></div></div></div><div class="${ssrRenderClass([unref(isHovering) && !unref(isPlaying) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2", "absolute -bottom-24 left-1/2 -translate-x-1/2 w-max max-w-[200px] z-20 pointer-events-none transition-all duration-300 transform"])}"><div class="bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl flex flex-col items-center border border-white/10"><p class="text-sm font-bold text-center leading-tight">${ssrInterpolate(__props.album)}</p><p class="text-xs text-white/60 text-center mt-0.5">${ssrInterpolate(__props.artist)}</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/VinylRecord.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const VinylRecord = Object.assign(_sfc_main$3, { __name: "WidgetsVinylRecord" });
const _imports_0$1 = publicAssetsURL("/images/background.svg");
const _imports_1 = publicAssetsURL("/images/chess-poster.svg");
const _imports_2 = publicAssetsURL("/images/king-chess-poster.svg");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChessPoster",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(false);
    const isRevealed = ref(false);
    const isWriggling = ref(false);
    ref(0);
    ref(0);
    useClientSound("/audio/interaction-sound.mp3", { eager: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "select-none w-[360px] h-[360px] relative rounded-lg",
        "data-no-drag": "true"
      }, _attrs))} data-v-d5ffca1f><div class="${ssrRenderClass([{ "animate-wriggle": isWriggling.value }, "relative w-full h-full rounded-lg bg-black flex flex-col gap-4 items-center justify-center overflow-hidden shadow-xl"])}" data-v-d5ffca1f><img draggable="false" alt="Chess Pattern" class="rounded-lg absolute bottom-0 left-0 w-full h-full object-cover opacity-40"${ssrRenderAttr("src", _imports_0$1)} data-v-d5ffca1f><div class="scrolling-text-top absolute top-4 w-[400%] flex pointer-events-none" data-v-d5ffca1f><span class="text-[90px] text-white font-bold whitespace-nowrap animate-scroll-left" data-v-d5ffca1f> PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY </span></div><div class="scrolling-text-bottom absolute bottom-4 w-[400%] flex pointer-events-none" data-v-d5ffca1f><span class="text-[90px] text-white font-bold whitespace-nowrap rotate-180 animate-scroll-right" data-v-d5ffca1f> PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY </span></div><img draggable="false" alt="Chess Knight" width="177" height="172" class="rounded-lg absolute top-0 left-0 pointer-events-none"${ssrRenderAttr("src", _imports_1)} data-v-d5ffca1f><img draggable="false" alt="Chess King" width="224" height="233" class="rounded-lg absolute bottom-0 right-0 pointer-events-none"${ssrRenderAttr("src", _imports_2)} data-v-d5ffca1f><a href="https://chess.com" target="_blank" class="absolute inset-0 z-20" data-v-d5ffca1f></a></div>`);
      if (!isRevealed.value) {
        _push(`<canvas width="360" height="360" class="absolute top-0 left-0 w-full h-full rounded-lg z-30 scratch-cursor" data-v-d5ffca1f></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/ChessPoster.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ChessPoster = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-d5ffca1f"]]), { __name: "WidgetsChessPoster" });
const _imports_0 = publicAssetsURL("/images/Abeokuta.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LocationStamp",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "shadow-lg select-none relative rotate-[9deg]" }, _attrs))}><img draggable="false" alt="Abeokuta Stamp" width="240" height="240" class="rounded-sm"${ssrRenderAttr("src", _imports_0)}></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/LocationStamp.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LocationStamp = Object.assign(_sfc_main$1, { __name: "WidgetsLocationStamp" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "craft",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Craft | Lanre Segun",
      meta: [
        { name: "description", content: "A collection of interactive components and experiments." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground py-20 px-4 md:px-8 max-w-7xl mx-auto" }, _attrs))}><div class="mb-16"><h1 class="text-4xl md:text-5xl font-bold mb-4">Craft Lab</h1><p class="text-muted-foreground text-lg max-w-2xl"> A collection of interactive components and experiments crafted with Vue, Tailwind, and GSAP. Explore the building blocks of this portfolio. </p></div><div class="flex flex-col gap-24"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Menu Toolbar</h2><p class="text-muted-foreground leading-relaxed"> A responsive, floating navigation dock with active state tracking, theme toggling, and integrated music controls. Features a springy &quot;eject&quot; animation for the mini player. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Tailwind</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">GSAP</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>`);
      _push(ssrRenderComponent(FloatingDock, { demo: true }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Flip Clock</h2><p class="text-muted-foreground leading-relaxed"> A realistic retro flip clock component. It breaks down time into individual digits, each animating with a 3D fold effect when the value changes. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">CSS 3D</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>`);
      _push(ssrRenderComponent(FlipClock, null, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Simple Book</h2><p class="text-muted-foreground leading-relaxed"> A 3D book that subtly opens on hover. Uses CSS 3D transforms to create the spine, cover, and page thickness effects. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">CSS 3D</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>`);
      _push(ssrRenderComponent(Book3D, {
        cover: "/images/image_3.png",
        color: "#E32A24",
        width: 160,
        height: 220,
        title: "Design Systems",
        author: "Alla Kholmatova"
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Interactive Canvas</h2><p class="text-muted-foreground leading-relaxed"> An interactive drawing canvas with SVG turbulence filters. The line has a &quot;wobbly&quot; organic feel created by displacing the SVG path with noise. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">SVG Filters</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Pointer Events</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div><div class="scale-110">`);
      _push(ssrRenderComponent(DrawingCanvas, null, null, _parent));
      _push(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Music Album Player</h2><p class="text-muted-foreground leading-relaxed"> An interactive vinyl record player. Clicking starts the track, slides out the sleeve, and spins the record. Integrated with the global \`useAlbumPlayer\` store. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Howler.js</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Animations</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>`);
      _push(ssrRenderComponent(VinylRecord, {
        key: `demo-record`,
        cover: "/images/image_16.jpg",
        album: "Somewhere Only We Know",
        artist: "Keane",
        musicFile: "/audio/somewhere-only-we-know.mp3"
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Interactive Scratch Card</h2><p class="text-muted-foreground leading-relaxed"> A scratch-to-reveal component using HTML5 Canvas. Supports touch and mouse input, plays scratch sounds, and detects the percentage revealed to trigger a completion animation. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Canvas API</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Sound</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div>`);
      _push(ssrRenderComponent(ChessPoster, null, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Location Stamp</h2><p class="text-muted-foreground leading-relaxed"> A decorative stamp component with a fixed rotation. Simple yet effective for adding visual flair to layouts. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Tailwind</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]"></div><div class="scale-125">`);
      _push(ssrRenderComponent(LocationStamp, null, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/craft.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=craft-Cs7fmBx3.mjs.map
