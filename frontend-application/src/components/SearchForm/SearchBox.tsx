import * as React from "react";
import {
  SearchButton,
  SearchInput,
  StyledSearchForm,
} from "./SearchBox.styles";

interface ISearchBoxProps {
  initialValue: string;
  onSubmit: (newValue: string) => void;
}

export const SearchBox: React.FC<ISearchBoxProps> = ({
  initialValue,
  onSubmit,
}) => {
  const [currentValue, setCurrentValue] = React.useState<string>(initialValue);

  React.useEffect(() => {
    setCurrentValue(initialValue);
  }, [initialValue]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurrentValue(event.target.value);
  };

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(currentValue);
    return false;
  };

  return (
    <StyledSearchForm onSubmit={onSubmitForm}>
      <SearchInput
        type="text"
        value={currentValue}
        onChange={onChange}
        placeholder="Where do you want to go?"
      />
      <SearchButton />
    </StyledSearchForm>
  );
};
