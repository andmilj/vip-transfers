import '../src/db/start';
import { seedDatabase } from '../src/db/seed';

async function seeder() {
  seedDatabase();
}

export default seeder;
