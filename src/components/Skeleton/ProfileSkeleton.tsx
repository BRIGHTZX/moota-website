import React from "react";
import { Skeleton } from "../ui/skeleton";

function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-10 bg-secondary rounded-full" />
    </div>
  );
}

export default ProfileSkeleton;
