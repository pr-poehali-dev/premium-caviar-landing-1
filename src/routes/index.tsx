import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { api } from "@/lib/api";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [products, news] = await Promise.all([
      api.getProducts().catch(() => []),
      api.getNews().catch(() => []),
    ]);
    return { products, news };
  },
  component: IndexRoute,
});

function IndexRoute() {
  const { products, news } = Route.useLoaderData();
  return <Index initialProducts={products} initialNews={news} />;
}
