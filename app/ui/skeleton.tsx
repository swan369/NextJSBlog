export function SkeletonLoading() {
  return (
    <div className="space-y-4 p-4">
      <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md"></div>
      <div className="w-full h-4 bg-gray-300 animate-pulse rounded-md"></div>
      <div className="w-full h-4 bg-gray-300 animate-pulse rounded-md"></div>
      <div className="w-1/4 h-10 bg-gray-300 animate-pulse rounded-md"></div>
    </div>
  );
}
