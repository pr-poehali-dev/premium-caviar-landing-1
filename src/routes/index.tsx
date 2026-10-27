import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { api } from "@/lib/api";
import { DEFAULT_CONTENT } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, news, content] = await Promise.all([
      api.getProducts().catch(() => []),
      api.getNews().catch(() => []),
      api.getContent().catch(() => DEFAULT_CONTENT),
    ]);
    return { products, news, content };
  },
  component: IndexRoute,
});

function IndexRoute() {
  const { products, news, content } = Route.useLoaderData();
  return <Index initialProducts={products} initialNews={news} content={content} />;
}
