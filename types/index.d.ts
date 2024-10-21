export interface INavabarLink {
  id: number;
  label: string;
  href: string;
}

export interface ICategoryItem {
  id: number;
  name: string;
  title: string;
  image: string;
}

export interface IState {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
}
