<template>
  <div class="flex flex-col gap-3 items-center">
    <div style="--stagger:1"
      class="select-none flex flex-col gap-2 sm:gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-span-2 row-span-2 sm:w-[568px] shadow-lg p-6 h-fit ">
      <div class="flex gap-3 items-center ">
        <span class="relative flex shrink-0 overflow-hidden rounded-full size-12 sm:size-14">
          <img class="aspect-square h-full w-full" alt="Profile Picture" src="/images/profile-avatar.jpg">
        </span>
        <div class="flex flex-1 justify-between items-center">
          <div class="flex flex-col">
            <p class="text-base sm:text-xl font-medium"> Lanre Segun </p>
            <p class="text-base font-medium text-muted-foreground"> Senior Product Designer </p>
          </div>
          <div class="sm:size-10 size-8">
            <!-- Dark Mode Logo -->
            <svg v-if="isDark" width="100%" height="100%" viewBox="0 0 320 320" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160C35.8172 160 0 195.817 0 240C0 284.183 35.8172 320 80 320C124.183 320 160 284.183 160 240C160 284.183 195.817 320 240 320C284.183 320 320 284.183 320 240C320 195.817 284.183 160 240 160C284.183 160 320 124.183 320 80C320 35.8172 284.183 0 240 0C195.817 0 160 35.8172 160 80C160 35.8172 124.183 0 80 0Z"
                fill="white" />
              <path d="M150 90V170H230V230H90V90H150Z" fill="black" stroke="black" stroke-width="20" />
            </svg>
            <!-- Light Mode Logo -->
            <svg v-else width="100%" height="100%" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M240 0.5C283.907 0.5 319.5 36.0934 319.5 80C319.5 123.907 283.907 159.5 240 159.5V160.5C283.907 160.5 319.5 196.093 319.5 240C319.5 283.907 283.907 319.5 240 319.5C196.093 319.5 160.5 283.907 160.5 240H159.5C159.5 283.907 123.907 319.5 80 319.5C36.0934 319.5 0.5 283.907 0.5 240C0.500002 196.093 36.0934 160.5 80 160.5V159.5C36.0934 159.5 0.5 123.907 0.5 80C0.500001 36.0934 36.0934 0.500001 80 0.5C123.907 0.5 159.5 36.0934 159.5 80H160.5C160.5 36.0934 196.093 0.500002 240 0.5Z"
                fill="black" stroke="black" />
              <path d="M150 90V170H230V230H90V90H150Z" fill="white" stroke="white" stroke-width="20" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <span class="text-sm sm:text-base leading-relaxed">Strategic Senior Product Designer with 5+ years of experience
          across Web3, Fintech, and SaaS. I bridge the gap between complex engineering requirements and premium
          UI.</span>
        <p class="hidden sm:inline text-sm sm:text-base">Specializing in Human-Centered Design (HCD) and
          accessibility-first systems, focusing on Android Material Design 3 and tokenized design systems that reduce
          friction.</p>
        <p class="text-sm sm:text-base leading-relaxed">Have fun exploring my portfolio, and feel free to connect below.
        </p>
        <div class="flex flex-row gap-4">
          <a target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-sm gap-2"
            href="https://x.com/Olusegun51">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              class="w-5 h-5">
              <path
                d="M23.25 5.13125C22.4226 5.49214 21.5337 5.73599 20.5993 5.84621C21.5525 5.28438 22.2838 4.39287 22.6287 3.33164C21.7369 3.8525 20.7489 4.23095 19.6975 4.43384C18.8552 3.55208 17.6562 3 16.3284 3C13.7797 3 11.7126 5.03468 11.7126 7.54536C11.7126 7.9004 11.7543 8.24569 11.8315 8.57928C7.99368 8.38908 4.59381 6.57971 2.31666 3.83104C1.92029 4.50406 1.69237 5.28438 1.69237 6.11542C1.69237 7.69167 2.50791 9.08356 3.74557 9.89802C2.98851 9.87363 2.27702 9.66977 1.65472 9.32936V9.38788C1.65472 11.5894 3.24516 13.426 5.35781 13.8435C4.96937 13.9469 4.5621 14.0015 4.14194 14.0015C3.84467 14.0015 3.55432 13.9742 3.2729 13.9215C3.86052 15.726 5.56492 17.0409 7.58542 17.076C6.00489 18.2952 4.01412 19.0219 1.85191 19.0219C1.47932 19.0219 1.11169 19.0004 0.75 18.9585C2.79329 20.2489 5.21908 21 7.82522 21C16.3175 21 20.96 14.0766 20.96 8.07207C20.96 7.87699 20.955 7.67996 20.9461 7.48488C21.8478 6.84307 22.6307 6.04422 23.248 5.13417L23.25 5.13125Z"
                fill="currentColor"></path>
            </svg>
            <span class="hidden sm:inline">Twitter </span>
          </a>
          <a target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-sm gap-2"
            href="https://www.linkedin.com/in/oluwasegun-olanrewaju-b847bb188/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              class="w-5 h-5">
              <path
                d="M19.65 3H4.35C3.99196 3 3.64858 3.14223 3.39541 3.39541C3.14223 3.64858 3 3.99196 3 4.35V19.65C3 20.008 3.14223 20.3514 3.39541 20.6046C3.64858 20.8578 3.99196 21 4.35 21H19.65C20.008 21 20.3514 20.8578 20.6046 20.6046C20.8578 20.3514 21 20.008 21 19.65V4.35C21 3.99196 20.8578 3.64858 20.6046 3.39541C20.3514 3.14223 20.008 3 19.65 3ZM8.4 18.3H5.7V10.2H8.4V18.3ZM7.05 8.625C6.74056 8.61616 6.4406 8.51632 6.18758 8.33797C5.93456 8.15962 5.7397 7.91066 5.62737 7.6222C5.51503 7.33374 5.49019 7.01857 5.55595 6.71607C5.6217 6.41358 5.77515 6.13716 5.9971 5.92138C6.21906 5.70559 6.49968 5.55999 6.80391 5.50278C7.10814 5.44556 7.42248 5.47927 7.70766 5.59969C7.99284 5.7201 8.23622 5.92189 8.40737 6.17983C8.57853 6.43778 8.66987 6.74044 8.67 7.05C8.66289 7.47331 8.4885 7.8766 8.18495 8.17173C7.88139 8.46685 7.47335 8.62982 7.05 8.625ZM18.3 18.3H15.6V14.034C15.6 12.756 15.06 12.297 14.358 12.297C14.1522 12.3107 13.9511 12.3649 13.7663 12.4566C13.5815 12.5482 13.4166 12.6755 13.2811 12.831C13.1457 12.9866 13.0422 13.1674 12.9768 13.363C12.9114 13.5586 12.8853 13.7652 12.9 13.971C12.8955 14.0129 12.8955 14.0551 12.9 14.097V18.3H10.2V10.2H12.81V11.37C13.0733 10.9695 13.435 10.6433 13.8605 10.4227C14.286 10.2021 14.761 10.0944 15.24 10.11C16.635 10.11 18.264 10.884 18.264 13.404L18.3 18.3Z"
                fill="currentColor"></path>
            </svg>
            <span class="hidden sm:inline">Linkedin </span>
          </a>
          <a target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-sm gap-2"
            href="https://github.com/Shegs8422">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              class="w-5 h-5">
              <path
                d="M12 1.95068C17.525 1.95068 22 6.42568 22 11.9507C21.9995 14.0459 21.3419 16.0883 20.1198 17.7902C18.8977 19.4922 17.1727 20.768 15.1875 21.4382C14.6875 21.5382 14.5 21.2257 14.5 20.9632C14.5 20.6257 14.5125 19.5507 14.5125 18.2132C14.5125 17.2757 14.2 16.6757 13.8375 16.3632C16.0625 16.1132 18.4 15.2632 18.4 11.4257C18.4 10.3257 18.0125 9.43818 17.375 8.73818C17.475 8.48818 17.825 7.46318 17.275 6.08818C17.275 6.08818 16.4375 5.81318 14.525 7.11318C13.725 6.88818 12.875 6.77568 12.025 6.77568C11.175 6.77568 10.325 6.88818 9.525 7.11318C7.6125 5.82568 6.775 6.08818 6.775 6.08818C6.225 7.46318 6.575 8.48818 6.675 8.73818C6.0375 9.43818 5.65 10.3382 5.65 11.4257C5.65 15.2507 7.975 16.1132 10.2 16.3632C9.9125 16.6132 9.65 17.0507 9.5625 17.7007C8.9875 17.9632 7.55 18.3882 6.65 16.8757C6.4625 16.5757 5.9 15.8382 5.1125 15.8507C4.275 15.8632 4.775 16.3257 5.125 16.5132C5.55 16.7507 6.0375 17.6382 6.15 17.9257C6.35 18.4882 7 19.5632 9.5125 19.1007C9.5125 19.9382 9.525 20.7257 9.525 20.9632C9.525 21.2257 9.3375 21.5257 8.8375 21.4382C6.8458 20.7752 5.11342 19.502 3.88611 17.799C2.65881 16.096 1.9989 14.0498 2 11.9507C2 6.42568 6.475 1.95068 12 1.95068Z"
                fill="currentColor"></path>
            </svg>
            <span class="hidden sm:inline"> GitHub </span>
          </a>
          <a target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 text-sm gap-2"
            href="mailto:olanrewajuoluwasegun51@gmail.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              class="w-5 h-5">
              <path
                d="M2.00224 6.88308C2.06365 5.28042 3.3823 4 5 4H19C20.6177 4 21.9363 5.28042 21.9978 6.88308L12.4472 11.6584C12.1657 11.7991 11.8343 11.7991 11.5528 11.6584L2.00224 6.88308Z"
                fill="currentColor"></path>
              <path
                d="M2 9.11804V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V9.11803L13.3416 13.4472C12.497 13.8695 11.5029 13.8695 10.6583 13.4472L2 9.11804Z"
                fill="currentColor"></path>
            </svg>
            <span class="hidden sm:inline"> Mail </span>
          </a>
        </div>
      </div>
      <div data-orientation="horizontal" role="none"
        class="h-[1px] w-full grow my-1.5 sm:my-2 shrink mix-blend-multiply dark:mix-blend-lighten bg-transparent border-t-[1px] border-dashed">
      </div>
      <ul class="flex flex-col gap-4">
        <li class="flex flex-row gap-4 inline-flex items-center justify-center">
          <div
            class="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#1798D5] flex-none">
          </div>
          <div class="flex flex-row w-full justify-between sm:items-center gap-4">
            <div class="flex flex-col">
              <span class="text-sm sm:text-base font-medium"> Keta Exchange </span>
              <span class="text-sm text-muted-foreground"> Web3 Product Designer (Contract) </span>
            </div>
            <div
              class="inline-flex items-center rounded-lg border px-2.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-fit border-secondary bg-secondary/40 hover:bg-secondary/80 tabular text-xs font-normal text-muted-foreground w-fit">
              Nov 2025</div>
          </div>
        </li>
        <li class="flex flex-row gap-4 inline-flex items-center justify-center">
          <div
            class="hidden sm:block size-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#00A868] flex-none">
          </div>
          <div class="flex flex-row w-full justify-between sm:items-center gap-4">
            <div class="flex flex-col">
              <span class="text-sm sm:text-base font-medium"> Grazac</span>
              <span class="text-sm text-muted-foreground"> Product Design Intern </span>
            </div>
            <div
              class="inline-flex items-center rounded-lg border px-2.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-fit border-secondary bg-secondary/40 hover:bg-secondary/80 tabular text-xs font-normal text-muted-foreground w-fit">
              Apr 2025 - Sep 2025</div>
          </div>
        </li>
        <li class="flex flex-row gap-4 inline-flex items-center justify-center">
          <div
            class="hidden sm:block h-10 w-10 flex-none inline-flex items-center justify-center rounded-sm bg-[#FF530A] flex-none">
          </div>
          <div class="flex flex-row w-full justify-between sm:items-center gap-4">
            <div class="flex flex-col">
              <span class="text-sm sm:text-base font-medium"> Independent </span>
              <span class="text-sm text-muted-foreground"> Lead Freelance Product Designer </span>
            </div>
            <div
              class="inline-flex items-center rounded-lg border px-2.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-fit border-secondary bg-secondary/40 hover:bg-secondary/80 tabular text-xs font-normal text-muted-foreground w-fit">
              2020 – 2024</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDark } = useTheme()
</script>
