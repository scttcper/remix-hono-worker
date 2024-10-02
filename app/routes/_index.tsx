import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

export const loader = (args: LoaderFunctionArgs) => {
  const { extra } = args.context;
  const { cloudflare } = args.context;
  return { cloudflare, extra };
};

export default function Index() {
  const { cloudflare, extra } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>header</h1>
      <h2>Var is {cloudflare.env.MY_VAR}</h2>
      <h3>
        {cloudflare.cf ? 'cf,' : ''}
        {cloudflare.ctx ? 'ctx,' : ''}
        {cloudflare.caches ? 'caches are available' : ''}
      </h3>
      <h4>Extra is {extra}</h4>
    </div>
  );
}
