import { Checkbox, TextInput } from "@mantine/core";
import { useForm } from "@tanstack/react-form";

// const cities = [
//   { id: 1, name: "Astana" },
//   { id: 2, name: "Aktau" },
// ];

export function TestPage() {
  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      isChecked: false,
      cityId: 1,
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      console.log(value);
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Field
          name="firstName"
          children={({ state, handleChange, handleBlur }) => (
            <TextInput
              defaultValue={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />
          )}
        />
        <Field
          name="isChecked"
          children={({ state, handleChange, handleBlur }) => (
            <Checkbox
              onChange={(e) => handleChange(e.target.checked)}
              onBlur={handleBlur}
              checked={state.value}
            />
          )}
        />
        {/*<Field*/}
        {/*  name="cityId"*/}
        {/*  children={({ state, handleChange }) => (*/}
        {/*    <Autocomplete*/}
        {/*      data={cities}*/}
        {/*      value={String(state.value)}*/}
        {/*      onChange={(value) => handleChange(value)}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*/>*/}
      </form>
      <div>
        <pre>{JSON.stringify(state.values, null, 2)}</pre>
      </div>
    </>
  );
}
