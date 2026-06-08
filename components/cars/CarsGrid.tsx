import { CarCard, type CarCardData } from "@/components/cars/CarCard";

export function CarsGrid({ cars }: { cars: CarCardData[] }) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16 bg-brand-gray-bg rounded-2xl">
        <h3 className="text-xl font-bold mb-2">No cars match your filters</h3>
        <p className="text-neutral-600 mb-4">
          Try removing some filters or browse the full list.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
