// Script para importar todos os dados do Firebase
// Execute este script após configurar o Firebase para popular o banco de dados

import { PopulateMateriais, cautelas, addViaturaDescription } from '../firebase/populate.js';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase/db.js';

// Usuários padrão para importar
const defaultUsers = [
  {
    username: 'admin',
    email: 'admin@gocg.gov.br', 
    password: 'admin123',
    role: 'admin',
    name: 'Administrador',
    department: 'GOCG',
    phone: '',
    created: new Date(),
    active: true
  },
  {
    username: 'operador',
    email: 'operador@gocg.gov.br',
    password: 'op123456',
    role: 'user',
    name: 'Operador',
    department: 'DMO',
    phone: '',
    created: new Date(),
    active: true
  }
];

// Categorias padrão
const defaultCategories = [
  { name: 'Equipamentos de Segurança', description: 'EPIs e equipamentos de proteção', active: true },
  { name: 'Ferramentas', description: 'Ferramentas e equipamentos de trabalho', active: true },
  { name: 'Equipamentos de Resgate', description: 'Materiais para operações de resgate', active: true },
  { name: 'Iluminação', description: 'Equipamentos de iluminação e energia', active: true },
  { name: 'Combate a Incêndio', description: 'Materiais de combate a incêndios', active: true },
  { name: 'Comunicação', description: 'Equipamentos de comunicação', active: true },
  { name: 'Eletrônicos', description: 'Equipamentos eletrônicos diversos', active: true }
];

// Viaturas padrão (exemplos)
const defaultVehicles = [
  {
    plate: 'ABC-1234',
    model: 'Caminhão ABR',
    brand: 'Mercedes-Benz',
    year: 2020,
    type: 'Resgate',
    status: 'Ativo',
    description: 'Viatura de Auto Bomba Resgate',
    created: new Date()
  },
  {
    plate: 'DEF-5678', 
    model: 'ASE',
    brand: 'Iveco',
    year: 2019,
    type: 'Socorro',
    status: 'Ativo',
    description: 'Auto Socorro de Emergência',
    created: new Date()
  },
  {
    plate: 'GHI-9012',
    model: 'Pick-up',
    brand: 'Toyota',
    year: 2021,
    type: 'Apoio',
    status: 'Ativo', 
    description: 'Viatura de Apoio Operacional',
    created: new Date()
  }
];

// Função para criar usuários padrão
export const createDefaultUsers = async () => {
  console.log('🔄 Importando usuários padrão...');
  
  try {
    const usersRef = collection(db, 'users');
    
    for (const user of defaultUsers) {
      await addDoc(usersRef, user);
      console.log(`✅ Usuário ${user.username} criado`);
    }
    
    console.log('✅ Usuários importados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao importar usuários:', error);
  }
};

// Função para criar categorias padrão
export const createDefaultCategories = async () => {
  console.log('🔄 Importando categorias padrão...');
  
  try {
    const categoriesRef = collection(db, 'categorias');
    
    for (const category of defaultCategories) {
      await addDoc(categoriesRef, {
        ...category,
        created: new Date()
      });
      console.log(`✅ Categoria ${category.name} criada`);
    }
    
    console.log('✅ Categorias importadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao importar categorias:', error);
  }
};

// Função para criar viaturas padrão
export const createDefaultVehicles = async () => {
  console.log('🔄 Importando viaturas padrão...');
  
  try {
    const vehiclesRef = collection(db, 'viaturas');
    
    for (const vehicle of defaultVehicles) {
      await addDoc(vehiclesRef, vehicle);
      console.log(`✅ Viatura ${vehicle.plate} criada`);
    }
    
    console.log('✅ Viaturas importadas com sucesso!');
    
    // Adiciona descrições às viaturas
    await addViaturaDescription();
    console.log('✅ Descrições de viaturas atualizadas!');
  } catch (error) {
    console.error('❌ Erro ao importar viaturas:', error);
  }
};

// Função principal para importar todos os dados
export const importAllData = async () => {
  console.log('🚀 Iniciando importação completa de dados...');
  console.log('⚠️  Certifique-se de que o Firebase está configurado corretamente!');
  
  try {
    // 1. Criar usuários primeiro
    await createDefaultUsers();
    
    // 2. Criar categorias 
    await createDefaultCategories();
    
    // 3. Popular materiais (usa os dados do array valor)
    console.log('🔄 Importando materiais...');
    await PopulateMateriais();
    console.log('✅ Materiais importados com sucesso!');
    
    // 4. Criar viaturas
    await createDefaultVehicles();
    
    // 5. Opcional: criar algumas cautelas de exemplo
    console.log('🔄 Criando cautelas de exemplo...');
    await cautelas();
    console.log('✅ Cautelas de exemplo criadas!');
    
    console.log('');
    console.log('🎉 IMPORTAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('');
    console.log('📋 Dados importados:');
    console.log('   • Usuários padrão (admin/admin123, operador/op123456)');
    console.log('   • Categorias de material');
    console.log('   • Inventário completo de materiais');
    console.log('   • Viaturas de exemplo');
    console.log('   • Movimentações de exemplo');
    console.log('');
    console.log('🔐 Para fazer login use:');
    console.log('   Usuário: admin');
    console.log('   Senha: admin123');
    console.log('');
    console.log('   Ou:');
    console.log('   Usuário: operador'); 
    console.log('   Senha: op123456');
    
  } catch (error) {
    console.error('❌ Erro durante a importação:', error);
    console.log('');
    console.log('🔧 Verifique se:');
    console.log('   • O arquivo .env está configurado corretamente');
    console.log('   • As credenciais do Firebase estão válidas');
    console.log('   • O Firestore está ativado no Firebase Console');
    console.log('   • As regras de segurança permitem escrita');
  }
};

// Se executado diretamente, roda a importação
if (import.meta.url === `file://${process.argv[1]}`) {
  importAllData();
}