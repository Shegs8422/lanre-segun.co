<template>
    <ClientOnly>
        <!-- Mobile View (≤768px) -->
        <div v-if="isMobile" class="min-h-screen bg-canvas relative overflow-y-auto">
            <!-- Background layers -->
            <div class="absolute inset-0 bg-linear-grid bg-[size:16px_16px] bg-[position:12px_12px]"></div>
            <div class="absolute inset-0 opacity-60 bg-cover bg-center z-10"
                style="background-image: url('/images/Layer-window.png')"></div>
            <div class="absolute inset-0 bg-linear-big-grid bg-[size:80px_80px] bg-[position:-4px_-4px] z-20"></div>
            <div class="absolute inset-0 bg-diagonal-grid bg-[size:80px_80px] bg-[position:-2.5px_-2.5px] z-30"></div>

            <!-- Content -->
            <div class="relative z-40 flex flex-col items-center gap-6 p-6 pt-24 pb-32">
                <ProfileCard />
                <EducationCard />
            </div>
        </div>

        <!-- Desktop View (>768px) -->
        <DraggableCanvas v-else>
            <!-- Orchestration Grid - 8x7 layout with 360px cells -->
            <div
                class="absolute orchestration grid gap-4 grid-cols-[repeat(8,360px)] grid-rows-[repeat(7,360px)] w-[2992px] h-[2620px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                <!-- Background fill -->
                <div class="z-[-1] w-[2992px] h-[2240px] pointer-events-none"></div>

                <!-- Profile Card - col 4, row 4 -->
                <div class="select-none flex flex-col gap-2 relative rounded-lg w-[568px] col-start-4 row-start-4 col-span-2 row-span-2 shadow-lg h-fit"
                    style="--stagger: 1">
                    <ProfileCard />
                </div>

                <!-- Education Card - col 4, row 7 -->
                <div class="select-none flex flex-col gap-2 relative rounded-lg w-[568px] col-start-4 row-start-7 col-span-2 row-span-1 shadow-lg h-fit bottom-[340px]"
                    style="--stagger: 39">
                    <EducationCard />
                </div>

                <!-- Drawing Canvas - col 2, row 2 -->
                <div class="select-none relative col-start-2 row-start-2 w-[340px] h-[340px] left-[60px] top-[140px] rotate-[-4deg]"
                    style="--stagger: 9" data-no-drag="true">
                    <DrawingCanvas />
                </div>

                <!-- Flip Clock - col 7, row 5 -->
                <div class="col-start-7 col-span-2 row-start-5 rotate-[4deg] relative z-50 w-fit top-[40px] left-[60px]"
                    style="--stagger: 12">
                    <FlipClock />
                </div>

                <!-- 3D Books -->
                <!-- Book 1 - The Path to Senior Designer -->
                <Book3D cover="/images/The Path to Senior Designer - ARTIOM DASHINSKY.jpg"
                    title="The Path to Senior Designer" author="ARTIOM DASHINSKY" color="#2D469B" :width="165"
                    :height="201" classes="col-start-3 row-start-1 rotate-[-12deg] top-[40px] left-[120px]"
                    :stagger="20" />

                <!-- Book 2 - The Effective Product Designer -->
                <Book3D cover="/images/The Effective Product Designer - ARTIOM DASHINSKY.jpg"
                    title="The Effective Product Designer" author="ARTIOM DASHINSKY" color="#F97316" :width="133"
                    :height="201" classes="col-start-5 row-start-2 top-[40px] left-[40px] rotate-[15deg]"
                    :stagger="21" />

                <!-- Book 3 - The Subtle Art of Not Giving a Fuck -->
                <Book3D cover="/images/The Subtle Art of Not Giving a Fuck - Mark Manson.jpg"
                    title="The Subtle Art of Not Giving a Fuck" author="Mark Manson" color="#F97316" :width="135"
                    :height="198" classes="col-start-2 row-start-4 rotate-[6deg]" :stagger="21" />

                <!-- Book 4 - Designing Brand Identity -->
                <Book3D cover="/images/Designing Brand Identity - Alina Wheeler.jpg" title="Designing Brand Identity"
                    author="Alina Wheeler" color="#EF4444" :width="135" :height="200"
                    classes="col-start-3 row-start-2 rotate-[-5deg] left-[10px] bottom-[20px]" :stagger="23" />

                <!-- Book 5 (Red 3) -->
                <Book3D cover="/images/image_1.jpg" color="#CA2528" :width="130" :height="198"
                    classes="col-start-1 row-start-5 rotate-[12deg] left-[20px] top-[80px]" :stagger="24" />

                <!-- Book 6 - Prompt Engineering for UX -->
                <Book3D cover="/images/Prompt Engineering for UX - MEDAVI.jpg" title="Prompt Engineering for UX"
                    author="MEDAVI" color="#F03800" :width="145" :height="198"
                    classes="col-start-6 row-start-6 rotate-[-10deg] right-[40px] top-[40px]" :stagger="25" />

                <!-- Book 7 - Grid System in Graphic Design -->
                <Book3D cover="/images/Grid System in Graphic Design - Josef Muller Brockmann.jpg"
                    title="Grid System in Graphic Design" author="Josef Muller Brockmann" color="#0A0A0A" :width="136"
                    :height="199" classes="col-start-7 row-start-4 rotate-[12deg] left-[140px] bottom-[40px]"
                    :stagger="26" />

                <!-- Book 8 - Design Beyond Limits with Figma -->
                <Book3D cover="/images/Design Beyond Limits with Figma - Simon Jun.jpg"
                    title="Design Beyond Limits with Figma" author="Simon Jun" color="#1abcfe" :width="128"
                    :height="197" classes="col-start-3 row-start-6 rotate-[4deg] left-[80px] top-[120px]"
                    :stagger="27" />

                <!-- Book 9 - Living Purposefully -->
                <Book3D cover="/images/Living Purposefully - Pastor Juwon Owolabi.jpg" title="Living Purposefully"
                    author="Pastor Juwon Owolabi" color="#8B4513" :width="137" :height="194"
                    classes="col-start-1 row-start-4 rotate-[-12deg] left-[20px] top-[40px]" :stagger="28" />

                <!-- Book 10 - Inclusive Design for Accessibility -->
                <Book3D cover="/images/Inclusive Design for Accessibility - Dale Cruse & D.Bourdreau.jpg"
                    title="Inclusive Design for Accessibility" author="Dale Cruse & D.Bourdreau" color="#252525"
                    :width="143" :height="198"
                    classes="col-start-7 row-start-1 h-fit w-fit left-[360px] relative top-[400px]" :stagger="29" />

                <!-- Book 11 - Fall in Love with the Problem -->
                <Book3D cover="/images/Fall in Love with the Problem, Not the Solution - Uri Levine.jpg"
                    title="Fall in Love with the Problem, Not the Solution" author="Uri Levine" color="##FEDE05"
                    :width="143" :height="201" classes="col-start-1 row-start-1 rotate-[-10deg] left-[60px] top-[20px]"
                    :stagger="30" />

                <!-- Book 12 (Beige) -->
                <Book3D cover="/images/image_5.png" color="#E1D2BC" :width="143" :height="202"
                    classes="col-start-3 row-start-7 rotate-[12deg] right-[80px] top-[40px]" :stagger="31" />

                <!-- Book 13 (White) -->
                <Book3D cover="/images/image_13.jpg" color="#F2F2F2" :width="160" :height="208"
                    classes="col-start-4 row-start-6 rotate-[-15deg] left-[80px] bottom-[20px]" :stagger="32" />

                <!-- Vinyl Records -->
                <VinylRecord :key="`tuyo-narcos`" cover="/images/tuyo-narcos-theme.jpg" album="Tuyo (Narcos Theme)"
                    artist="Rodrigo Amarante" musicFile="/audio/tuyo-narcos-theme.mp3"
                    classes="col-start-5 row-start-1 rotate-[-15deg] top-[40px] left-[60px]" :stagger="31" />

                <VinylRecord :key="`kendrick-heart`" cover="/images/The Heart 5 - Kendrick Lamar.jpg"
                    label="/images/The Heart 5 - Kendrick Lamar -1.jpg" album="The Heart Part 5" artist="Kendrick Lamar"
                    musicFile="/audio/the-heart-part-5.mp3"
                    classes="col-start-2 row-start-1 rotate-[12deg] top-[40px] left-[40px]" :stagger="32" />

                <VinylRecord :key="`iba-folouwa`" cover="/images/iba%20foluwa.jpg"
                    label="/images/iba%20foluwa%20-%201.jpg" album="Iba Folouwa" artist="Chief Commander Ebenezer Obey"
                    musicFile="/audio/chief-commander-ebenezer-obey-iba-folouwa.mp3"
                    classes="col-start-8 row-start-4 rotate-[8deg] left-[100px] bottom-[120px]" :stagger="33" />

                <VinylRecord :key="`silk-sonic`" cover="/images/image_10.png" album="An Evening with Silk Sonic"
                    artist="Silk Sonic" musicFile="/audio/leave-the-door-open.mp3"
                    classes="col-start-6 row-start-6 rotate-[8deg] left-[180px] bottom-[100px]" :stagger="34" />

                <VinylRecord :key="`keane`" cover="/images/Keane%20Hopes%20and%20fears.jpg"
                    label="/images/Keane%20Hopes%20and%20fears%20-%201.jpg" album="Somewhere Only We Know"
                    artist="Keane" musicFile="/audio/somewhere-only-we-know.mp3"
                    classes="col-start-1 row-start-7 rotate-[-8deg] left-[100px] bottom-[120px]" :stagger="35" />

                <VinylRecord :key="`mozart`" cover="/images/Wolfgang-amadeus-mozart.jpg"
                    label="/images/Wolfgang-amadeus-mozart-1.jpg" album="Symphony #40 in G Minor, K 550"
                    artist="Wolfgang Amadeus Mozart"
                    musicFile="/audio/mozart-symphony-40-in-g-minor-k-550-1-molto-allegro-128-ytshorts.savetube.me.mp3"
                    classes="col-start-3 row-start-5 rotate-[8deg] right-[140px] top-[140px]" :stagger="36" />

                <VinylRecord :key="`sunny`" cover="/images/Sunny.jpg" label="/images/Sunny - 2.jpg" album="Sunny"
                    artist="Boney M" musicFile="/audio/boney-m-sunny.mp3"
                    classes="col-start-7 row-start-1 rotate-[8deg] right-[40px] top-[20px]" :stagger="37" />


                <!-- Figma Logo -->
                <div style="--stagger:41"
                    class="select-none bg-white p-4 border-4 border-white rounded-xl relative col-start-8 row-start-3 w-fit h-fit rotate-[12deg] left-[40px] shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="80" height="80" viewBox="0 0 96 96"
                        id="Figma--Streamline-Svg-Logos">
                        <path fill="#0acf83"
                            d="M32.3332 95.0001c8.648 0 15.6666 -7.0187 15.6666 -15.6667V63.6667H32.3332c-8.648 0 -15.6667 7.0187 -15.6667 15.6667s7.0187 15.6667 15.6667 15.6667Z">
                        </path>
                        <path fill="#a259ff"
                            d="M16.6665 47.9999c0 -8.648 7.0187 -15.6666 15.6667 -15.6666h15.6666v31.3333H32.3332c-8.648 0 -15.6667 -7.0187 -15.6667 -15.6667Z">
                        </path>
                        <path fill="#f24e1e"
                            d="M16.6665 16.6667C16.6665 8.01867 23.6852 1 32.3332 1h15.6666v31.3333H32.3332c-8.648 0 -15.6667 -7.0186 -15.6667 -15.6666Z">
                        </path>
                        <path fill="#ff7262"
                            d="M47.9995 1h15.6667c8.648 0 15.6666 7.01867 15.6666 15.6667 0 8.648 -7.0186 15.6666 -15.6666 15.6666H47.9995V1Z">
                        </path>
                        <path fill="#1abcfe"
                            d="M79.3328 47.9999c0 8.648 -7.0186 15.6667 -15.6666 15.6667s-15.6667 -7.0187 -15.6667 -15.6667 7.0187 -15.6666 15.6667 -15.6666 15.6666 7.0186 15.6666 15.6666Z">
                        </path>
                    </svg>
                </div>

                <!-- Google Logo Box -->
                <div style="--stagger:42"
                    class="select-none relative col-start-1 row-start-5 w-[200px] h-[200px] shadow-2xl rounded-2xl overflow-hidden right-[60px] top-[120px] rotate-[4deg] ">
                    <div class="relative group h-full">
                        <div
                            class="relative w-full h-full overflow-hidden rounded-2xl shadow-lg select-none cursor-none bg-white flex items-center justify-center p-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96"
                                id="Google--Streamline-Svg-Logos" class="w-full h-auto">
                                <path fill="#ff302f"
                                    d="m92.2344 51.4194 2.6162 1.7442c-0.8491 1.2507 -2.8801 3.3965 -6.3914 3.3965 -4.3603 0 -7.6076 -3.3736 -7.6076 -7.6651 0 -4.5669 3.2817 -7.665 7.2404 -7.665 3.9817 0 5.9324 3.167 6.5635 4.8767l0.3443 0.8721 -10.2583 4.2456c0.7802 1.5376 1.9965 2.3178 3.7177 2.3178 1.7212 0 2.9146 -0.8491 3.7752 -2.1228Zm-8.0437 -2.7653 6.8503 -2.8457c-0.3786 -0.9524 -1.5032 -1.6294 -2.8457 -1.6294 -1.7097 0 -4.0849 1.5146 -4.0046 4.4751Z">
                                </path>
                                <path fill="#20b15a" d="M75.9062 33.4158h3.3047v22.4443h-3.3047V33.4158Z"></path>
                                <path fill="#3686f7"
                                    d="M70.6968 41.8267h3.1899v13.6318c0 5.657 -3.3391 7.9863 -7.2864 7.9863 -3.7177 0 -5.9553 -2.5014 -6.7929 -4.5324l2.926 -1.2164c0.5278 1.2508 1.8015 2.731 3.8669 2.731 2.5359 0 4.0965 -1.572 4.0965 -4.5095v-1.1016h-0.1148c-0.7573 0.918 -2.2031 1.7442 -4.039 1.7442 -3.8326 0 -7.3438 -3.3392 -7.3438 -7.6421 0 -4.326 3.5112 -7.6995 7.3438 -7.6995 1.8244 0 3.2817 0.8147 4.039 1.7097h0.1148v-1.1015Zm0.2295 7.0913c0 -2.708 -1.8015 -4.6817 -4.0965 -4.6817 -2.3178 0 -4.2685 1.9737 -4.2685 4.6817 0 2.6736 1.9507 4.6128 4.2685 4.6128 2.295 0.0114 4.0965 -1.9392 4.0965 -4.6128Z">
                                </path>
                                <path fill="#ff302f"
                                    d="M41.0576 48.8606c0 4.4177 -3.4424 7.665 -7.665 7.665 -4.2227 0 -7.6651 -3.2588 -7.6651 -7.665 0 -4.4407 3.4424 -7.6765 7.6651 -7.6765 4.2226 0 7.665 3.2358 7.665 7.6765Zm-3.3506 0c0 -2.7539 -1.9966 -4.6472 -4.3144 -4.6472 -2.3179 0 -4.3145 1.8933 -4.3145 4.6472 0 2.731 1.9966 4.6472 4.3145 4.6472 2.3178 0 4.3144 -1.9162 4.3144 -4.6472Z">
                                </path>
                                <path fill="#ffba40"
                                    d="M57.7993 48.895c0 4.4177 -3.4424 7.6651 -7.665 7.6651 -4.2227 0 -7.6651 -3.2474 -7.6651 -7.6651 0 -4.4407 3.4424 -7.665 7.6651 -7.665 4.2226 0 7.665 3.2129 7.665 7.665Zm-3.362 0c0 -2.7539 -1.9966 -4.6472 -4.3145 -4.6472s-4.3145 1.8933 -4.3145 4.6472c0 2.731 1.9966 4.6472 4.3145 4.6472 2.3293 0 4.3145 -1.9277 4.3145 -4.6472Z">
                                </path>
                                <path fill="#3686f7"
                                    d="M13.1287 53.198c-4.8079 0 -8.57157 -3.8784 -8.57157 -8.6863 0 -4.8078 3.76367 -8.6863 8.57157 -8.6863 2.5932 0 4.4865 1.0213 5.8864 2.3294l2.3064 -2.3064c-1.9507 -1.8704 -4.5554 -3.2932 -8.1928 -3.2932C6.54224 32.5552 1 37.9253 1 44.5117s5.54224 11.9566 12.1287 11.9566c3.5571 0 6.2421 -1.1704 8.342 -3.3506 2.1572 -2.1572 2.8228 -5.1865 2.8228 -7.6421 0 -0.7688 -0.0918 -1.5606 -0.1951 -2.1458H13.1287v3.19h7.8142c-0.2295 1.9966 -0.8606 3.362 -1.7901 4.2915 -1.1245 1.136 -2.903 2.3867 -6.0241 2.3867Z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- TypeScript Logo -->
                <svg style="--stagger:40"
                    class="select-none border-white border-4 rounded-lg relative row-start-2 col-start-1 top-[140px] left-[40px]"
                    xmlns="http://www.w3.org/2000/svg" fill="none" width="80" height="80" viewBox="0 0 512 512">
                    <rect class="rounded-lg" fill="#3178c6" height="512" width="512"></rect>
                    <path clip-rule="evenodd"
                        d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z"
                        fill="#fff" fill-rule="evenodd"></path>
                </svg>

                <img draggable="false" alt="Profile example" width="92" height="80"
                    class="pointer-events-none select-none relative col-start-4 row-start-6 right-[120px] top-[40px]"
                    style="--stagger:8" src="/images/image_4.png">

                <img draggable="false" alt="Profile example" width="321" height="86"
                    class="rotate-[10deg] pointer-events-none select-none relative col-start-7 row-start-5 right-[40px]"
                    style="--stagger:14" src="/images/image_2.png">

                <img draggable="false" alt="Profile example" width="160" height="142"
                    class="select-none pointer-events-none relative col-start-8 row-start-6 top-[20px] right-[40px]"
                    style="--stagger:16" src="/images/image_6.png">

                <img draggable="false" alt="Profile example" width="98" height="160"
                    class="select-none pointer-events-none relative col-start-1 row-start-6 top-[80px] left-[40px] rotate-[36deg]"
                    style="--stagger:11" src="/images/image_1.png">

                <img draggable="false" alt="Mojo Sticker" width="80"
                    class="select-none pointer-events-none relative col-start-2 row-start-6 top-[140px] left-[120px]"
                    style="--stagger:12" src="/images/image_4.png">

                <svg style="--stagger:15"
                    class="select-none relative left-[140px] col-start-7 row-start-7 top-[40px] border-4 border-white rounded-lg"
                    width="127" height="57" viewBox="0 0 138 57" aria-label="MDX" role="img">
                    <rect height="55.5" rx="4.5" width="136.5" x=".75" y=".75"></rect>
                    <g fill="none" stroke="#fff" stroke-width="6">
                        <path d="M16.5 44V19L30.25 32.75l14-14v25"></path>
                        <path d="M70.5 40V10.75"></path>
                        <path d="M57 27.25L70.5 40.75l13.5-13.5"></path>
                        <path d="M122.5 41.24L93.25 12M93.5 41.25L122.75 12"></path>
                    </g>
                </svg>

                <!-- Next.js Logo Box -->
                <div style="--stagger:13"
                    class="select-none relative col-start-4 row-start-3 w-[300px] h-[300px] shadow-2xl rounded-2xl overflow-hidden left-[40px] bottom-[20px] rotate-[4deg] ">
                    <div class="relative group">
                        <div
                            class="relative w-full h-full overflow-hidden rounded-2xl shadow-lg select-none cursor-none bg-black">
                            <img alt="Logo variation 1" draggable="false" width="1024" height="1024"
                                class="w-full h-full object-contain transition-all select-none duration-150 ease-out"
                                src="/images/image_12.png">
                        </div>
                    </div>
                </div>

                <!-- Brazil Stamp -->
                <div class="col-start-7 row-start-1 h-fit w-fit left-[360px] relative top-[40px]" style="--stagger:35">
                    <BrazilStamp />
                </div>

                <!-- Chess Poster -->
                <div class="col-start-6 row-start-2 h-[360px] w-[360px] left-[130px] top-[80px] relative"
                    style="--stagger:38">
                    <ChessPoster />
                </div>

                <!-- Additional Sticker (Profile/Horse/Sticker) -->

                <!-- Polaroid Photos (Draggable Cards) -->
                <DraggableWidget
                    class="relative max-w-[100vw] col-start-3 row-start-4 w-fit h-fit col-span-1 bottom-[160px] left-[100px]"
                    style="--stagger: 3">
                    <div class="rotate-[14deg] transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/image_21.jpg" alt="Profile example" />
                    </div>
                </DraggableWidget>

                <DraggableWidget
                    class="relative max-w-[100vw] col-start-2 row-start-5 w-fit h-fit col-span-1 bottom-[160px] left-[240px]"
                    style="--stagger: 4">
                    <div class="rotate-[-12deg] transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/image_2.jpg" alt="Profile example" />
                    </div>
                </DraggableWidget>

                <DraggableWidget
                    class="relative max-w-[100vw] col-start-6 row-start-4 w-fit h-fit col-span-1 bottom-[180px] left-[80px]"
                    style="--stagger: 5">
                    <div class="rotate-[2deg] transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/image_14.png" alt="Profile example" />
                    </div>
                </DraggableWidget>

                <DraggableWidget
                    class="relative max-w-[100vw] col-start-6 row-start-5 w-fit h-fit col-span-1 bottom-[200px] right-[70px]"
                    style="--stagger: 6">
                    <div class="rotate-[8deg] transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/segun.jpg" alt="Lanre Segun" />
                    </div>
                </DraggableWidget>

            </div>
        </DraggableCanvas>
    </ClientOnly>
</template>

<script setup lang="ts">
// Widget Imports
import Book3D from '~/components/widgets/Book3D.vue'
import VinylRecord from '~/components/widgets/VinylRecord.vue'
import FlipClock from '~/components/widgets/FlipClock.vue'
import DraggableCanvas from '~/components/widgets/DraggableCanvas.vue'
import DraggableWidget from '~/components/widgets/DraggableWidget.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import EducationCard from '~/components/EducationCard.vue'
import PolaroidPhoto from '~/components/PolaroidPhoto.vue'
import DrawingCanvas from '~/components/widgets/DrawingCanvas.vue'
import BrazilStamp from '~/components/widgets/LocationStamp.vue'
import ChessPoster from '~/components/widgets/ChessPoster.vue'

// Mobile detection
const isMobile = ref(false)

onMounted(() => {
    if (process.client) {
        const checkMobile = () => {
            isMobile.value = window.innerWidth <= 768
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
    }
})

// Conditional overflow based on device
const bodyClass = computed(() => {
    return isMobile.value ? 'bg-background' : 'overflow-hidden bg-background'
})

useSeoMeta({
    title: 'Lanre Segun - Senior Product Designer | Interactive Portfolio',
    description: 'C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.',
    ogTitle: 'Lanre Segun - Senior Product Designer | Interactive Portfolio',
    ogDescription: 'C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.',
    ogImage: '/og-image.png',
    ogUrl: 'https://lanre-segun.vercel.app',
    twitterTitle: 'Lanre Segun - Senior Product Designer',
    twitterDescription: 'Strategic Product Designer bridging complex engineering and premium UI.',
    twitterImage: '/og-image.png',
    twitterCard: 'summary'
})

useHead({
    bodyAttrs: {
        class: bodyClass
    }
})
</script>

<style>
/* Animation for staggered elements */
[style*="--stagger"] {
    animation: fadeInUp 0.6s ease-out forwards;
    animation-delay: calc(var(--stagger) * 0.05s);
    opacity: 0;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
