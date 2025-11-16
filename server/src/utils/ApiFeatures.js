class ApiFeatures {
  query;
  queryString;

  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // filter queries
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["fields", "sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);
    const formattedQuery = {};

    Object.keys(queryObj).forEach((key) => {
      if (key.includes("[")) {
        const [field, operator] = key.split(/\[|\]/).filter(Boolean); // e.g. role[ne] => ['role', 'ne']
        if (!formattedQuery[field]) formattedQuery[field] = {};
        formattedQuery[field][`$${operator}`] = queryObj[key];
      } else {
        formattedQuery[key] = queryObj[key];
      }
    });

    this.query = this.query.find(formattedQuery);

    return this;
  }

  // sort queries
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // select field queries
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  search() {
    return this;
  }
}

module.exports = ApiFeatures;
