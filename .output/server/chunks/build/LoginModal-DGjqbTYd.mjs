import { defineComponent, useSSRContext, ref, mergeProps, unref, computed, nextTick } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRouter } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PasswordRecovery",
  __ssrInlineRender: true,
  emits: ["success", "cancel"],
  setup(__props, { emit: __emit }) {
    const securityQuestions = ref([]);
    const userAnswers = ref(["", "", ""]);
    const isVerified = ref(false);
    const newPassword = ref("");
    const confirmPassword = ref("");
    const error = ref("");
    const success = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}>`);
      if (!unref(isVerified)) {
        _push(`<div><h3 class="text-lg font-bold text-white mb-4">Answer Your Security Questions</h3><div class="flex flex-col gap-4"><!--[-->`);
        ssrRenderList(unref(securityQuestions), (question, index) => {
          _push(`<div class="flex flex-col gap-2"><label class="text-sm text-neutral-400">${ssrInterpolate(question)}</label><input${ssrRenderAttr("value", unref(userAnswers)[index])} type="text" placeholder="Your answer" required class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"></div>`);
        });
        _push(`<!--]--><button type="button" class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Verifying..." : "Verify Answers")}</button></div></div>`);
      } else {
        _push(`<div><h3 class="text-lg font-bold text-white mb-4">Set New Password</h3><div class="flex flex-col gap-4"><input${ssrRenderAttr("value", unref(newPassword))} type="password" placeholder="New password" required class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"><input${ssrRenderAttr("value", unref(confirmPassword))} type="password" placeholder="Confirm new password" required class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"><button type="button" class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Resetting..." : "Reset Password")}</button></div></div>`);
      }
      if (unref(error)) {
        _push(`<p class="text-red-500 text-sm text-center">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(success)) {
        _push(`<p class="text-green-500 text-sm text-center">${ssrInterpolate(unref(success))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PasswordRecovery.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "PasswordRecovery" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoginModal",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const isOpen = ref(false);
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    const passwordInput = ref(null);
    useRouter();
    const isRecoveryMode = ref(false);
    const modalTitle = computed(() => isRecoveryMode.value ? "Password Recovery" : "Restricted Access");
    const open = () => {
      isOpen.value = true;
      isRecoveryMode.value = false;
      nextTick(() => {
        passwordInput.value?.focus();
      });
    };
    const close = () => {
      isOpen.value = false;
      password.value = "";
      error.value = "";
      isRecoveryMode.value = false;
    };
    const handleRecoverySuccess = () => {
      close();
    };
    __expose({ open });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PasswordRecovery = __nuxt_component_0;
      if (unref(isOpen)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm" }, _attrs))} data-v-7f89f2a9><div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl relative" data-v-7f89f2a9><button class="absolute top-4 right-4 text-neutral-500 hover:text-white" data-v-7f89f2a9><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-7f89f2a9><line x1="18" y1="6" x2="6" y2="18" data-v-7f89f2a9></line><line x1="6" y1="6" x2="18" y2="18" data-v-7f89f2a9></line></svg></button><h2 class="text-xl font-bold text-white mb-6" data-v-7f89f2a9>${ssrInterpolate(unref(modalTitle))}</h2>`);
        if (!unref(isRecoveryMode)) {
          _push(`<form class="flex flex-col gap-4" data-v-7f89f2a9><input${ssrRenderAttr("value", unref(password))} type="password" placeholder="Enter password..." autocomplete="current-password" class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" data-v-7f89f2a9><button type="submit" class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-7f89f2a9>${ssrInterpolate(unref(loading) ? "Checking..." : "Enter CMS")}</button><button type="button" class="text-sm text-neutral-400 hover:text-white transition-colors mt-2" data-v-7f89f2a9> Forgot Password? </button></form>`);
        } else {
          _push(`<div data-v-7f89f2a9>`);
          _push(ssrRenderComponent(_component_PasswordRecovery, {
            onSuccess: handleRecoverySuccess,
            onCancel: ($event) => isRecoveryMode.value = false
          }, null, _parent));
          _push(`<button type="button" class="w-full text-sm text-neutral-400 hover:text-white transition-colors mt-4" data-v-7f89f2a9> Back to Login </button></div>`);
        }
        if (unref(error)) {
          _push(`<p class="text-red-500 text-sm mt-4 text-center" data-v-7f89f2a9>${ssrInterpolate(unref(error))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LoginModal = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-7f89f2a9"]]), { __name: "LoginModal" });

export { LoginModal as default };
//# sourceMappingURL=LoginModal-DGjqbTYd.mjs.map
