
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AnimatedCursor: typeof import("../components/AnimatedCursor.vue").default
export const DraggableCanvas: typeof import("../components/DraggableCanvas.vue").default
export const DraggableSticker: typeof import("../components/DraggableSticker.vue").default
export const DraggableWidget: typeof import("../components/DraggableWidget.vue").default
export const FigmaShape: typeof import("../components/FigmaShape.vue").default
export const FloatingDock: typeof import("../components/FloatingDock.vue").default
export const HeroSection: typeof import("../components/HeroSection.vue").default
export const HorizontalScroll: typeof import("../components/HorizontalScroll.vue").default
export const MagneticButton: typeof import("../components/MagneticButton.vue").default
export const PinnedSection: typeof import("../components/PinnedSection.vue").default
export const PolaroidPhoto: typeof import("../components/PolaroidPhoto.vue").default
export const PreloaderScreen: typeof import("../components/PreloaderScreen.vue").default
export const ProfileCard: typeof import("../components/ProfileCard.vue").default
export const TheHeader: typeof import("../components/TheHeader.vue").default
export const WebGLCanvas: typeof import("../components/WebGLCanvas.vue").default
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only").default
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only").default
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
export const TresCanvas: typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue").default
export const TresCanvas: typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue").default
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder").default
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components").Link
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components").Base
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components").Title
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components").Style
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components").Head
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components").Html
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components").Body
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default
export const LazyAnimatedCursor: LazyComponent<typeof import("../components/AnimatedCursor.vue").default>
export const LazyDraggableCanvas: LazyComponent<typeof import("../components/DraggableCanvas.vue").default>
export const LazyDraggableSticker: LazyComponent<typeof import("../components/DraggableSticker.vue").default>
export const LazyDraggableWidget: LazyComponent<typeof import("../components/DraggableWidget.vue").default>
export const LazyFigmaShape: LazyComponent<typeof import("../components/FigmaShape.vue").default>
export const LazyFloatingDock: LazyComponent<typeof import("../components/FloatingDock.vue").default>
export const LazyHeroSection: LazyComponent<typeof import("../components/HeroSection.vue").default>
export const LazyHorizontalScroll: LazyComponent<typeof import("../components/HorizontalScroll.vue").default>
export const LazyMagneticButton: LazyComponent<typeof import("../components/MagneticButton.vue").default>
export const LazyPinnedSection: LazyComponent<typeof import("../components/PinnedSection.vue").default>
export const LazyPolaroidPhoto: LazyComponent<typeof import("../components/PolaroidPhoto.vue").default>
export const LazyPreloaderScreen: LazyComponent<typeof import("../components/PreloaderScreen.vue").default>
export const LazyProfileCard: LazyComponent<typeof import("../components/ProfileCard.vue").default>
export const LazyTheHeader: LazyComponent<typeof import("../components/TheHeader.vue").default>
export const LazyWebGLCanvas: LazyComponent<typeof import("../components/WebGLCanvas.vue").default>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only").default>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only").default>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
export const LazyTresCanvas: LazyComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue").default>
export const LazyTresCanvas: LazyComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue").default>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder").default>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Link>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Base>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Title>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Style>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Head>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Html>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Body>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default>

export const componentNames: string[]
