import type {ReactNode} from "react";
import {HeadContent, Outlet, Scripts, createRootRoute} from "@tanstack/react-router";
import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {PLATFORM_META, PLATFORM_SCRIPTS} from "@/platform/scripts.gen";
import {HMR_CLIENT} from "@/platform/dev-hmr";
import NotFound from "@/pages/NotFound";
import appCss from "@/index.css?url";

const TITLE = "ЭкоФИШ+ | Премиальная икра и рыба";
const DESCRIPTION =
    "ООО ЭКОФИШ+ — продажа премиальной черной икры осетра и стерляди, свежей и копченой рыбы с доставкой. Качественная продукция без консервантов.";
const OG_IMAGE = "https://cdn.poehali.dev/projects/***/files/og-image-1764850804072.jpg";
const SITE_URL = "https://ekofish.poehali.app";

const JSON_LD = `{
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      "name": "ООО ЭКОФИШ+",
      "url": "https://ekofish.poehali.app",
      "logo": "https://cdn.poehali.dev/projects/9f359434-86ab-480f-a0e5-43c6b85ff555/files/og-image-1764850804072.jpg",
      "image": "https://cdn.poehali.dev/projects/9f359434-86ab-480f-a0e5-43c6b85ff555/files/og-image-1764850804072.jpg",
      "description": "Продажа премиальной черной икры осетра и стерляди, свежей и копченой рыбы с доставкой. Качественная продукция без консервантов.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "RU",
        "addressLocality": "Россия"
      },
      "telephone": "+7-927-573-12-73",
      "priceRange": "₽₽₽",
      "servesCuisine": "Seafood",
      "hasMenu": {
        "@type": "Menu",
        "hasMenuSection": [
          {
            "@type": "MenuSection",
            "name": "Икра",
            "hasMenuItem": [
              {
                "@type": "MenuItem",
                "name": "Икра осетра",
                "description": "Черная зернистая малосольная икра без консервантов",
                "offers": {
                  "@type": "Offer",
                  "price": "56000",
                  "priceCurrency": "RUB",
                  "availability": "https://schema.org/InStock"
                }
              },
              {
                "@type": "MenuItem",
                "name": "Икра стерляди",
                "description": "Черная зернистая малосольная икра без консервантов",
                "offers": {
                  "@type": "Offer",
                  "price": "40000",
                  "priceCurrency": "RUB",
                  "availability": "https://schema.org/InStock"
                }
              }
            ]
          }
        ]
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+7-927-573-12-73",
          "contactType": "Customer Service",
          "areaServed": "RU",
          "availableLanguage": ["Russian"],
          "name": "Валерий"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+7-927-560-79-19",
          "contactType": "Customer Service",
          "areaServed": "RU",
          "availableLanguage": ["Russian"],
          "name": "Любовь"
        }
      ]
    }`;

const METRIKA = `(function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
                return;
            }
        }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(101026698, "init", {
        trustedDomains: ["poehali.dev"],
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true
    });`;

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {charSet: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1.0"},
            {title: TITLE},
            {name: "description", content: DESCRIPTION},
            {property: "og:title", content: TITLE},
            {property: "og:description", content: DESCRIPTION},
            {property: "og:image", content: OG_IMAGE},
            {name: "author", content: "ООО ЭКОФИШ+"},
            {name: "keywords", content: "икра осетра, икра стерляди, черная икра, осетр, стерлядь, копченая рыба, балык"},
            {name: "google-site-verification", content: "PLACEHOLDER_VERIFICATION_CODE"},
            {name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"},
            {name: "googlebot", content: "index, follow"},
            {name: "google", content: "notranslate"},
            {httpEquiv: "X-Content-Type-Options", content: "nosniff"},
            {httpEquiv: "X-Frame-Options", content: "SAMEORIGIN"},
            {name: "referrer", content: "strict-origin-when-cross-origin"},
            {property: "og:type", content: "website"},
            {property: "og:url", content: SITE_URL},
            {property: "og:site_name", content: "ЭкоФИШ+"},
            {property: "og:image:width", content: "4800"},
            {property: "og:image:height", content: "2520"},
            {property: "og:image:alt", content: "ЭкоФИШ+ Премиальная икра и рыба"},
            {name: "twitter:card", content: "summary_large_image"},
            {name: "twitter:title", content: TITLE},
            {name: "twitter:description", content: "ООО ЭКОФИШ+ — продажа премиальной черной икры осетра и стерляди, свежей и копченой рыбы с доставкой."},
            {name: "twitter:image", content: OG_IMAGE},
            ...PLATFORM_META,
        ],
        links: [
            {rel: "stylesheet", href: appCss},
            {rel: "icon", type: "image/jpg", href: "/img/favicon.jpg"},
            {rel: "apple-touch-icon", href: "/img/apple-touch-icon.png"},
            {rel: "canonical", href: SITE_URL},
            {rel: "alternate", hrefLang: "ru", href: SITE_URL},
        ],
        // IMPORTANT: DO NOT REMOVE PLATFORM SCRIPTS AND THE DEV HMR CLIENT!
        scripts: [
            ...(import.meta.env.DEV ? [{children: HMR_CLIENT}] : []),
            ...PLATFORM_SCRIPTS,
            {type: "application/ld+json", children: JSON_LD},
            {children: METRIKA},
        ],
    }),
    component: RootComponent,
    notFoundComponent: NotFound,
});

function RootComponent() {
    return (
        <RootDocument>
            <TooltipProvider>
                <Toaster/>
                <Sonner/>
                <Outlet/>
            </TooltipProvider>
        </RootDocument>
    );
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <Scripts/>
        </body>
        </html>
    );
}
