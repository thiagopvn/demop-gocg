import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  People,
  Category,
  Build,
  LocalShipping,
  Assignment,
  CheckCircle,
  Error
} from '@mui/icons-material';
import {
  createDefaultUsers,
  createDefaultCategories,
  createDefaultVehicles,
  importAllData
} from '../../scripts/importData';
import { PopulateMateriais, cautelas } from '../../firebase/populate';

const steps = [
  {
    label: 'Usuários Padrão',
    description: 'Criar usuários administrador e operador',
    icon: People
  },
  {
    label: 'Categorias',
    description: 'Importar categorias de materiais',
    icon: Category
  },
  {
    label: 'Materiais',
    description: 'Popular inventário completo',
    icon: Build
  },
  {
    label: 'Viaturas',
    description: 'Criar viaturas de exemplo',
    icon: LocalShipping
  },
  {
    label: 'Movimentações',
    description: 'Criar cautelas de exemplo',
    icon: Assignment
  }
];

export default function Setup() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(new Set());
  const [errors, setErrors] = useState({});
  const [importing, setImporting] = useState(false);

  const handleStepExecution = async (stepIndex) => {
    setLoading(true);
    setErrors(prev => ({ ...prev, [stepIndex]: null }));

    try {
      switch (stepIndex) {
        case 0:
          await createDefaultUsers();
          break;
        case 1:
          await createDefaultCategories();
          break;
        case 2:
          await PopulateMateriais();
          break;
        case 3:
          await createDefaultVehicles();
          break;
        case 4:
          await cautelas();
          break;
        default:
          throw new Error('Etapa não reconhecida');
      }

      setCompleted(prev => new Set([...prev, stepIndex]));
      
      if (stepIndex < steps.length - 1) {
        setActiveStep(stepIndex + 1);
      }
    } catch (error) {
      console.error(`Erro na etapa ${stepIndex}:`, error);
      setErrors(prev => ({
        ...prev,
        [stepIndex]: error.message
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleImportAll = async () => {
    setImporting(true);
    setErrors({});
    setCompleted(new Set());
    setActiveStep(0);

    try {
      await importAllData();
      
      // Marcar todas as etapas como completas
      setCompleted(new Set([0, 1, 2, 3, 4]));
      setActiveStep(steps.length);
      
    } catch (error) {
      console.error('Erro na importação completa:', error);
      setErrors({ general: error.message });
    } finally {
      setImporting(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      p: 3
    }}>
      <Card sx={{ 
        maxWidth: 800, 
        mx: 'auto',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            mb: 2
          }}>
            Configuração Inicial do Sistema
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Configure o sistema importando dados padrão e exemplos para começar a usar o sistema de controle de cautela.
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Erro geral:</Typography>
              {errors.general}
            </Alert>
          )}

          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleImportAll}
              disabled={importing || loading}
              startIcon={importing ? <CircularProgress size={20} /> : <CloudUpload />}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                }
              }}
            >
              {importing ? 'Importando Todos os Dados...' : 'Importar Todos os Dados'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Ou execute etapa por etapa
            </Typography>
          </Divider>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completed.has(index);
              const hasError = errors[index];

              return (
                <Step key={step.label} completed={isCompleted}>
                  <StepLabel 
                    error={!!hasError}
                    icon={
                      isCompleted ? (
                        <CheckCircle color="success" />
                      ) : hasError ? (
                        <Error color="error" />
                      ) : (
                        <Icon />
                      )
                    }
                  >
                    <Typography variant="h6">{step.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.description}
                    </Typography>
                  </StepLabel>
                  
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      {hasError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                          {hasError}
                        </Alert>
                      )}
                      
                      {isCompleted && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                          Etapa concluída com sucesso!
                        </Alert>
                      )}
                      
                      <Button
                        variant="contained"
                        onClick={() => handleStepExecution(index)}
                        disabled={loading || importing}
                        startIcon={loading && activeStep === index ? <CircularProgress size={16} /> : <Icon />}
                        sx={{ mr: 1 }}
                      >
                        {isCompleted ? 'Executar Novamente' : 'Executar Etapa'}
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>

          {completed.size === steps.length && (
            <Box sx={{ mt: 4 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  🎉 Configuração Concluída!
                </Typography>
                <Typography>
                  Todos os dados foram importados com sucesso. Você já pode usar o sistema.
                </Typography>
              </Alert>

              <Card sx={{ mt: 2, background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    🔐 Credenciais de Acesso
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <People color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Administrador"
                        secondary="Usuário: admin | Senha: admin123"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <People color="secondary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Operador"
                        secondary="Usuário: operador | Senha: op123456"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => window.location.href = '/'}
                  sx={{ 
                    borderColor: '#667eea',
                    color: '#667eea',
                    '&:hover': {
                      borderColor: '#764ba2',
                      backgroundColor: 'rgba(102, 126, 234, 0.05)'
                    }
                  }}
                >
                  Ir para Login
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}