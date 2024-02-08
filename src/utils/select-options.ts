import {trpc} from "@/utils/trpc";
import {LoadOptions} from "react-select-async-paginate"
import {Axios} from "@/utils/axios";
import {Category} from "@/server/api/routers/category/schema";
import {Author} from "@/server/api/routers/author/schema";
export type OptionType = {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export type OptionTypeNumber = {
  value: number;
  label: string;
}

interface GroupBase<Option> {
  readonly options: readonly Option[];
  readonly label?: string;
}


export const loadOptionsCategory: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  {token?: string}
> = async(search, _, additional) => {

  const res = await Axios.get("/categories", {
    headers: {
      Authorization: `Bearer ${additional?.token  ?? ""}`,
      Accept: "application/json"
    }
  })

  const categories = (await res.data) as {
    data: Category[]
  }

  const options = categories.data
    .filter((category) => category.category_name.toLowerCase().includes(search))
    .map((category) => ({
      label: category.category_name,
      value: `${category.id}`
    }))

  return {
    options,
    additional: {
      token: additional?.token
    }
  }
}

export const loadOptionsAuthor: LoadOptions<
  OptionType,
  GroupBase<OptionType>,
  {token?: string}
> = async(search, _, additional) => {
  const res = await Axios.get('/authors', {
    headers: {
      Authorization: `Bearer ${additional?.token ?? ""}`,
      Accept: "application/json"
    }
  })

  const authors = (await res.data) as {
    data: Author[]
  }

  const options = authors.data
    .filter((author) => author.author_name.toLowerCase().includes(search))
    .map((author) => ({
    label: author.author_name,
    value: `${author.id}`
  }))

  return {
    options,
    additional: {
      token: additional?.token
    }
  }
}
