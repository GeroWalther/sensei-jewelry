import { NewProductForm } from "./_form";

export default function NewProductPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold">New product</h1>
      <p className="mt-1 text-sm text-muted-foreground">Add a product to your catalog.</p>
      <div className="mt-8">
        <NewProductForm />
      </div>
    </div>
  );
}
