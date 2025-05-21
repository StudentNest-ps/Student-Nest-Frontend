import ApartmentDetails from '@/components/apartment/Apartment';

export default async function ApartmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  console.log(typeof id);
  return <ApartmentDetails id={id} />;
}
