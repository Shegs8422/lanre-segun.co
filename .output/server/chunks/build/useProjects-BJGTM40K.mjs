const useProjects = () => {
  const projects = [
    {
      slug: "stone-payment-terminal",
      title: "Stone Payment Terminal",
      subtitle: "Fintech Dashboard & POS",
      date: "October 10, 2024",
      description: "Designing a comprehensive financial management platform for SMEs with real-time analytics and seamless transaction oversight.",
      coverImage: "/images/projects/project-1.png",
      content: {
        heroImage: "/images/projects/project-1.png",
        introduction: "In 2024, Stone aimed to revolutionize the point-of-sale market for small and medium enterprises. The challenge was to move beyond simple transaction processing to a holistic financial hub. We designed a unified ecosystem that integrates sales, inventory management, and financial forecasting into a single, intuitive interface.",
        sections: [
          {
            type: "text",
            content: 'The core problem for merchants was fragmentation. They used one device for payments, a spreadsheet for inventory, and another system for invoices. Our solution was "Stone One" — a dashboard that centralized these workflows.'
          },
          {
            type: "image",
            image: "/images/projects/project-1.png",
            caption: "Unified Dashboard: Sales, Inventory, and Analytics"
          },
          {
            type: "text",
            content: 'We prioritized "glanceability" for the dashboard. A store owner should be able to check their daily performance in 5 seconds. We developed a card-based UI that highlights critical alerts—low stock, pending invoices, or unusual transaction spikes.'
          },
          {
            type: "grid",
            images: ["/images/projects/project-1.png", "/images/projects/project-1.png"]
          },
          {
            type: "text",
            content: 'For the physical POS interface, we focused on speed. By simplifying the checkout flow and introducing "Quick Keys" for common items, we reduced the average transaction time by 30%.'
          }
        ],
        results: {
          description: "The launch of the new ecosystem saw immediate adoption. Merchants reported a significant reduction in administrative time, allowing them to focus more on their customers.",
          metrics: [
            { label: "Merchant Adoption", value: "+67k" },
            { label: "Txn Speed", value: "-30%" },
            { label: "NPS Score", value: "72" }
          ]
        }
      }
    },
    {
      slug: "fashion-ecommerce-redesign",
      title: "Velvet & Thread",
      subtitle: "Luxury Fashion E-commerce",
      date: "September 15, 2024",
      description: "Reimagining the online shopping experience for modern luxury consumers, focusing on mobile-first navigation and editorial storytelling.",
      coverImage: "/images/projects/project-2.png",
      content: {
        heroImage: "/images/projects/project-2.png",
        introduction: `Luxury fashion online often suffers from a "catalog" feel that disconnects from the brand's physical prestige. For Velvet & Thread, we wanted to bridge this gap. The goal was to create a digital flagship that felt as curated and immersive as walking into a boutique.`,
        sections: [
          {
            type: "text",
            content: 'We started by deconstructing the user journey. Traditional filters (Size, Color, Price) feel utilitarian. We introduced "Moods" and "Occasions" as primary navigation paths, allowing users to shop by context (e.g., "Weekend Getaway", "Gala Evening").'
          },
          {
            type: "image",
            image: "/images/projects/project-2.png",
            caption: "Editorial-style Product Discovery"
          },
          {
            type: "text",
            content: 'On mobile, we implemented a gesture-based "Lookbook" viewer. Users can swipe through complete outfits rather than just isolated items. Tapping a look instantly reveals the component pieces without navigating away.'
          },
          {
            type: "grid",
            images: ["/images/image_4.jpg", "/images/image_5.jpg"]
          }
        ],
        results: {
          description: 'The editorial approach paid off. Users spent significantly more time exploring collections, and the "Shop the Look" feature drove a massive increase in multi-item orders.',
          metrics: [
            { label: "Mobile Conversion", value: "+40%" },
            { label: "Avg Order Val", value: "$850" },
            { label: "Time on Site", value: "+3.5m" }
          ]
        }
      }
    },
    {
      slug: "neo-mobile-banking",
      title: "Neo Bank App",
      subtitle: "Personal Finance",
      date: "August 20, 2024",
      description: "Building a seamless mobile banking experience with intuitive user flows, biometric security, and personalized financial insights.",
      coverImage: "/images/projects/project-3.png",
      content: {
        heroImage: "/images/projects/project-3.png",
        introduction: 'Financial anxiety is real. Most banking apps simply list transactions, which can be overwhelming. We designed "Neo" to be a financial wellness companion, interpreting data to give users clarity and confidence.',
        sections: [
          {
            type: "text",
            content: `Security doesn't have to be friction. We implemented "Invisible Auth" using advanced biometrics that authenticates the user continuously in the background, minimizing the need for repetitive logins while maintaining bank-grade security.`
          },
          {
            type: "image",
            image: "/images/projects/project-3.png",
            caption: "Personalized Financial Insights Feed"
          },
          {
            type: "text",
            content: `The "Clarify" feature automatically recategorizes vague transaction names (like "AMZN MKTP US") into clear logos and merchant names. We also introduced smart budgeting that adapts to the user's spending habits rather than rigid monthly limits.`
          }
        ],
        results: {
          description: 'Users cited "peace of mind" as the primary reason for switching to Neo. The clarity of the data led to healthier financial behaviors among the active user base.',
          metrics: [
            { label: "Daily Actives", value: "+25%" },
            { label: "Savings Rate", value: "+15%" },
            { label: "Trust Score", value: "4.9/5" }
          ]
        }
      }
    },
    {
      slug: "nexus-saas-platform",
      title: "Nexus SaaS Platform",
      subtitle: "B2B Productivity & Design System",
      date: "July 05, 2024",
      description: "Creating a scalable design system for a B2B productivity platform that empowers teams to collaborate and deliver high-impact results.",
      coverImage: "/images/projects/project-4.png",
      content: {
        heroImage: "/images/projects/project-4.png",
        introduction: "Nexus had grown rapidly, but so had its technical debt. The UI was inconsistent, with 50+ shades of gray and fragmented components. We paused feature work to build a robust Design System that would serve as the foundation for the next stage of growth.",
        sections: [
          {
            type: "text",
            content: 'We conducted a comprehensive visual audit. The result was a unified token system for color, typography, and spacing. We built "Nexus UI", a React component library with built-in accessibility and dark mode support.'
          },
          {
            type: "grid",
            images: ["/images/image_6.jpg", "/images/image_7.jpg"]
          },
          {
            type: "text",
            content: "Beyond just UI, we defined interaction patterns. How a modal opens, how a toast notification appears—these standardized behaviors reduced cognitive load for users and implementation time for developers."
          },
          {
            type: "image",
            image: "/images/projects/project-4.png",
            caption: "Nexus Design System Component Library"
          }
        ],
        results: {
          description: "The Design System was a force multiplier. New features that used to take weeks were now shipping in days, with higher visual quality and zero regression bugs.",
          metrics: [
            { label: "Dev Efficiency", value: "+30%" },
            { label: "Time to Market", value: "-40%" },
            { label: "Accessibility", value: "100%" }
          ]
        }
      }
    },
    {
      slug: "medilink-healthcare-portal",
      title: "MediLink Portal",
      subtitle: "Patient-Centered Healthcare",
      date: "June 12, 2024",
      description: "Designing patient-centered digital health solutions that streamline data access and improve interactions between patients and providers.",
      coverImage: "/images/projects/project-5.png",
      content: {
        heroImage: "/images/projects/project-5.png",
        introduction: "Healthcare portals are often designed for administrators, not patients. MediLink flipped this model. Our goal was to create a portal that was accessible, reassuring, and extremely easy to navigate for patients of all ages, including the elderly.",
        sections: [
          {
            type: "text",
            content: "We prioritized accessibility (WCAG AAA). Using large, clear typography and high-contrast visuals, we ensured that critical information like test results and appointments was legible for everyone."
          },
          {
            type: "image",
            image: "/images/projects/project-5.png",
            caption: "Accessible Medication Dashboard"
          },
          {
            type: "text",
            content: 'We simplified the medical jargon. Instead of just showing "CBC Results", we provided context: "Your blood count is normal." Visual graphs helped patients view trends in their health over time without needing a medical degree.'
          }
        ],
        results: {
          description: "The redesign significantly reduced anxiety for patients waiting for results and alleviated the burden on support staff answering basic questions.",
          metrics: [
            { label: "Patient CSAT", value: "4.8/5" },
            { label: "Support Calls", value: "-45%" },
            { label: "Appt Adherence", value: "+20%" }
          ]
        }
      }
    }
  ];
  const getAllProjects = () => projects;
  const getProjectBySlug = (slug) => {
    return projects.find((p) => p.slug === slug);
  };
  const getAdjacentProjects = (slug) => {
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) return { prev: null, next: null };
    return {
      prev: index > 0 ? projects[index - 1] : null,
      next: index < projects.length - 1 ? projects[index + 1] : null
    };
  };
  return {
    projects,
    getAllProjects,
    getProjectBySlug,
    getAdjacentProjects
  };
};

export { useProjects as u };
//# sourceMappingURL=useProjects-BJGTM40K.mjs.map
