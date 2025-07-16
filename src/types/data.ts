export interface Hit<T> {
  _score: number;
  _source: T;
  highlight: Highlight;
}

export interface Highlight {
  title: string[];
  description: string[];
}

export interface Total {
  value: number;
}

export interface Data<T> {
  total: Total;
  hits: Hit<T>[];
}

export interface Root<T> {
  data: Data<T>;
  doc_per_year: DocPerYear[];
}

export interface DocPerYear {
  key_as_string: string;
  key: number;
  doc_count: number;
}
