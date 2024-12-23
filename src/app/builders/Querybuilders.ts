import { FilterQuery, Query } from "mongoose";
import mongoose from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }

    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query };
  //   const excludeFields = [
  //     "searchTerm",
  //     "sort",
  //     "limit",
  //     "page",
  //     "fields",
  //     "search",
  //     "sortBy",
  //     "sortOrder",
  //   ];
  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
  //   return this;
  // }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "search",
      "sortBy",
      "sortOrder",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.filter && typeof queryObj.filter === "string") {
      try {
        queryObj.filter = new mongoose.Types.ObjectId(queryObj.filter);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error("Invalid ID format");
      }
    }

    this.modelQuery = this.modelQuery.find(queryObj.filter as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy || "createdAt";
    const sortOrder = this?.query?.sortOrder === "desc" ? "-" : "";
    const sort = `${sortOrder}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
