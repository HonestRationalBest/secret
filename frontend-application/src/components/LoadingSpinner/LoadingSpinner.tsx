import { LoadingRing, LoadingWrapper } from "./LoadingSpinner.styles";

export const LoadingSpinner = () => {
  return (
    <LoadingWrapper>
      <LoadingRing>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingRing>
    </LoadingWrapper>
  );
};
