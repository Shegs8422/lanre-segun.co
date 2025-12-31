import { defineComponent, mergeProps, ref, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { F as FloatingDock, u as useAlbumPlayer, a as useClientSound } from './FloatingDock-CSB0DJoP.mjs';
import { b as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import './nuxt-link-CD-o4OdI.mjs';
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
import '@supabase/ssr';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

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
      if (!digitState) return "";
      if (digitState.current === value) return "current";
      if (digitState.previous === value) return "previous";
      return "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "flip-clock-container",
        ref_key: "containerRef",
        ref: containerRef,
        "data-no-drag": "true"
      }, _attrs))} data-v-9078b631><div class="countdown flex gap-4 lg:gap-8 items-center h-[100px] w-fit" data-v-9078b631><div class="flex gap-1 group-h" data-v-9078b631><ul class="flip" data-v-9078b631><!--[-->`);
      ssrRenderList(3, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(0, n - 1))}" data-v-9078b631><span data-v-9078b631><div class="up" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul><ul class="flip" data-v-9078b631><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(1, n - 1))}" data-v-9078b631><span data-v-9078b631><div class="up" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex gap-1 group-m" data-v-9078b631><ul class="flip" data-v-9078b631><!--[-->`);
      ssrRenderList(6, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(2, n - 1))}" data-v-9078b631><span data-v-9078b631><div class="up" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul><ul class="flip" data-v-9078b631><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(3, n - 1))}" data-v-9078b631><span data-v-9078b631><div class="up" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul></div><div class="flex gap-1 group-s" data-v-9078b631><ul class="flip" data-v-9078b631><!--[-->`);
      ssrRenderList(6, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(4, n - 1))}" data-v-9078b631><span data-v-9078b631><div class="up" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div></span></li>`);
      });
      _push(`<!--]--></ul><ul class="flip" data-v-9078b631><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<li class="${ssrRenderClass(getDigitClass(5, n - 1))}" data-v-9078b631><span data-v-9078b631><div class="up" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div><div class="down" data-v-9078b631><div class="shadow" data-v-9078b631></div><div class="inn" data-v-9078b631>${ssrInterpolate(n - 1)}</div></div></span></li>`);
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
const FlipClock = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-9078b631"]]), { __name: "WidgetsFlipClock" });
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full mx-auto border-4 border-[#CEB990] bg-[#ECDDC0] rounded-lg shadow-sm overflow-hidden select-none" }, _attrs))} data-v-caaffa6c><canvas class="${ssrRenderClass([
        "absolute inset-0 w-full h-full touch-none cursor-crosshair"
      ])}" data-v-caaffa6c></canvas><div class="absolute bottom-4 right-4 flex flex-col gap-2 items-end z-10" data-v-caaffa6c><div class="flex flex-col-reverse gap-2 items-center" data-v-caaffa6c><button class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95" style="${ssrRenderStyle({ backgroundColor: activeColor.value })}" data-v-caaffa6c></button>`);
      if (isPaletteOpen.value) {
        _push(`<div class="flex flex-col gap-2 mb-2 animate-in" data-v-caaffa6c><!--[-->`);
        ssrRenderList(colors, (color) => {
          _push(`<button class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95" style="${ssrRenderStyle({ backgroundColor: color })}" data-v-caaffa6c></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="w-10 h-10 rounded-md bg-white shadow-sm hover:scale-110 active:scale-95 flex items-center justify-center" title="Clear board" data-v-caaffa6c> 🧽 </button></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/widgets/DrawingCanvas.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const DrawingCanvas = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-caaffa6c"]]), { __name: "WidgetsDrawingCanvas" });
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
      volume
    } = useAlbumPlayer();
    const isHovering = ref(false);
    const rotation = ref(0);
    const animationFrameId = ref(null);
    const albumId = computed(
      () => `${props.album}-${props.artist}-${props.musicFile}`.replace(/\s+/g, "-").toLowerCase()
    );
    const isPlaying = computed(() => isPlayingGlobal(albumId.value));
    const audioControls = props.musicFile ? useClientSound(props.musicFile, {
      volume: volume.value
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
      watch(volume, (newVolume) => {
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
    useSeoMeta({
      title: "Craft | Lanre Segun",
      description: "A collection of interactive components and experiments crafted with Vue, Tailwind, and GSAP. Explore the building blocks of this portfolio.",
      ogTitle: "Craft | Lanre Segun",
      ogDescription: "A collection of interactive components and experiments crafted with Vue, Tailwind, and GSAP. Explore the building blocks of this portfolio.",
      ogImage: "/og-image.png",
      ogUrl: "https://lanre-segun.vercel.app/craft",
      twitterTitle: "Craft | Lanre Segun",
      twitterDescription: "A collection of interactive components and experiments crafted with Vue, Tailwind, and GSAP. Explore the building blocks of this portfolio.",
      twitterImage: "/og-image.png",
      twitterCard: "summary"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background text-foreground py-20 px-4 md:px-8 max-w-7xl mx-auto" }, _attrs))}><div class="mb-16"><h1 class="text-4xl md:text-5xl font-bold mb-4">Craft Lab</h1><p class="text-muted-foreground text-lg max-w-2xl"> A collection of interactive components and experiments crafted with Vue, Tailwind, and GSAP. Explore the building blocks of this portfolio. </p></div><div class="flex flex-col gap-24"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Menu Toolbar</h2><p class="text-muted-foreground leading-relaxed"> A responsive, floating navigation dock with active state tracking, theme toggling, and integrated music controls. Features a springy &quot;eject&quot; animation for the mini player. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Tailwind</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">GSAP</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div>`);
      _push(ssrRenderComponent(FloatingDock, { demo: true }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Flip Clock</h2><p class="text-muted-foreground leading-relaxed"> A realistic retro flip clock component. It breaks down time into individual digits, each animating with a 3D fold effect when the value changes. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">CSS 3D</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div>`);
      _push(ssrRenderComponent(FlipClock, null, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Simple Book</h2><p class="text-muted-foreground leading-relaxed"> A 3D book that subtly opens on hover. Uses CSS 3D transforms to create the spine, cover, and page thickness effects. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">CSS 3D</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div>`);
      _push(ssrRenderComponent(Book3D, {
        cover: "/images/image_3.png",
        color: "#E32A24",
        width: 160,
        height: 220,
        title: "Design Systems",
        author: "Alla Kholmatova"
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Interactive Canvas</h2><p class="text-muted-foreground leading-relaxed"> An interactive drawing canvas with SVG turbulence filters. The line has a &quot;wobbly&quot; organic feel created by displacing the SVG path with noise. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">SVG Filters</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Pointer Events</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div><div class="scale-110">`);
      _push(ssrRenderComponent(DrawingCanvas, null, null, _parent));
      _push(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Music Album Player</h2><p class="text-muted-foreground leading-relaxed"> An interactive vinyl record player. Clicking starts the track, slides out the sleeve, and spins the record. Integrated with the global \`useAlbumPlayer\` store. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Howler.js</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Animations</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div>`);
      _push(ssrRenderComponent(VinylRecord, {
        key: `demo-record`,
        cover: "/images/Keane Hopes and fears.jpg",
        album: "Somewhere Only We Know",
        artist: "Keane",
        musicFile: "/audio/somewhere-only-we-know.mp3"
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Interactive Scratch Card</h2><p class="text-muted-foreground leading-relaxed"> A scratch-to-reveal component using HTML5 Canvas. Supports touch and mouse input, plays scratch sounds, and detects the percentage revealed to trigger a completion animation. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Canvas API</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Sound</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div>`);
      _push(ssrRenderComponent(ChessPoster, null, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 flex flex-col gap-4"><h2 class="text-2xl font-semibold">Location Stamp</h2><p class="text-muted-foreground leading-relaxed"> A decorative stamp component with a fixed rotation. Simple yet effective for adding visual flair to layouts. </p><div class="flex flex-wrap gap-2 mt-2"><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span><span class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Tailwind</span></div></div><div class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[16px_16px]"></div><div class="scale-125">`);
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
//# sourceMappingURL=craft-Cx53W1YT.mjs.map
