import ApartmentDetails from '@/components/apartment/Apartment';

export default async function ApartmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ApartmentDetails id={id} />;
}
