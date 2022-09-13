import { getManager } from 'typeorm';

class DynamicService {
  entityManager = getManager();
  constructor() {
    // console.log(this.SelectTable(), 'from dynamic');
  }

  public async SelectTable() {
    try {
      const someQuery = await this.entityManager.query(
        `
            SELECT * FROM officer_entity LIMIT 100
          `,
        [],
      );
      return someQuery;
    } catch (error) {
      console.log(error);
    }
  }
}

export default DynamicService;
