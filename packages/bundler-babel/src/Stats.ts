class Stats {
  errors?: Error[];

  startTime?: number;

  endTime?: number;

  hasErrors() {
    return this.errors?.length > 0;
  }
}

export default Stats;
