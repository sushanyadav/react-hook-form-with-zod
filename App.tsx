import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const getSchema = (maxValue: number) => {
  const validationSchema = z.object({
    name: z.number().max(maxValue),
  });

  return validationSchema;
};

type FormFieldType = z.infer<ReturnType<typeof getSchema>>;

export default function App() {
  const [maxValue, setMaxValue] = React.useState(0);
  const [maxValueLoading, setMaxValueLoading] = React.useState(false);

  const validationSchema = getSchema(maxValue);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FormFieldType>({
    mode: 'all',
    resolver: zodResolver(validationSchema),
    defaultValues: { name: undefined },
  });

  // mock api to get max value
  React.useEffect(() => {
    setMaxValueLoading(true);
    setTimeout(() => {
      setMaxValue(10);
      setMaxValueLoading(false);
    }, 2000);
  }, []);

  const onSubmit: SubmitHandler<FormFieldType> = async ({ name }) => {
    console.log(name);
  };

  // if (maxValueLoading) {
  //   return (
  //     <React.Fragment>
  //       Max Value is loading for validation please wait.....
  //     </React.Fragment>
  //   );
  // }

  const transformOnChange = (value: number) => {
    return isNaN(value) ? undefined : value;
  };

  const transformValue = (value: number) => {
    return isNaN(value) ? '' : value;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({
          field: { value, onChange, ...props },
          fieldState: { error },
        }) => {
          // not rendering the field until we have max value for validation
          if (maxValueLoading) {
            return (
              <React.Fragment>
                Max Value is loading for validation please wait.....
              </React.Fragment>
            );
          }

          return (
            <React.Fragment>
              {/* Number field  */}
              <input
                type="number"
                onChange={(e) => {
                  onChange(transformOnChange(e.target.valueAsNumber));
                }}
                value={transformValue(value)}
                {...props}
              />
              {/* Error message */}
              <p style={{ color: 'red' }}>{error?.message}</p>
            </React.Fragment>
          );
        }}
      />
      {/* Submit and Reset button */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="submit" disabled={maxValueLoading || isSubmitting}>
          Submit
        </button>
        <button
          type="button"
          disabled={maxValueLoading}
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
