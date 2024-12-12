export type DTO<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? DTO<U>[]
    : T[K] extends object
    ? DTO<T[K]>
    : T[K];
};

export function mapDTO<T>(json: any, ignoredFields: string[] = []): DTO<T> {
  const dto: any = {};

  for (const key in json) {
    if (ignoredFields.includes(key)) {
      continue; // Skip ignored fields
    }

    if (Array.isArray(json[key])) {
      dto[key] = json[key].map((item: any) => mapDTO(item, ignoredFields));
    } else if (typeof json[key] === 'object' && json[key] !== null) {
      dto[key] = mapDTO(json[key], ignoredFields);
    } else {
      dto[key] = json[key];
    }
  }

  return dto;
}
