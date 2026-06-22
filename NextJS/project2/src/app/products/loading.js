import { Skeleton } from "@/components/ui/skeleton";

export default function Loading () {
  return (
    <div className="w-[320px] flex flex-col bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="relative h-52 p-4">
        <Skeleton className="h-full w-full rounded-xl" />

        <Skeleton className="absolute top-3 right-3 h-8 w-8 rounded-full" />

        <Skeleton className="absolute bottom-3 left-3 h-6 w-14 rounded-full" />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <Skeleton className="h-5 w-24 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        <Skeleton className="h-4 w-32" />

        <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
          <div className="space-y-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>

          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
};