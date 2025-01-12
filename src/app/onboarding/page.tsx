'use client'
import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { completeOnboarding } from '@/lib/api';
import { setCredentials } from '@/store/authSlice';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  Progress,
  useToast,
  useColorModeValue,
  Stack,
  useCheckbox,
  useCheckboxGroup,
  chakra,
  Flex,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { AppDispatch, RootState } from '@/store';

// Custom Checkbox component with styling
const CustomCheckbox = (props: any) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display='flex'  
      flexDirection='row'
      alignItems='center'
      gridColumnGap={4}  
      bg='transparent'
      rounded='lg'
      px={3}
      py={2}
      cursor='pointer'
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems='center'
        justifyContent='center'
        border='2px solid'
        borderColor={state.isChecked ? 'black' : 'gray.300'}
        w={5}
        h={5}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={3} h={3} bg='black' />}
      </Flex>
      <Text color='black' fontWeight='medium' {...getLabelProps()}>
        {props.label}
      </Text>
    </chakra.label>
  );
};

const Onboarding = () => {
  // Define state for the component
  const buttonColor = useColorModeValue('white', 'brand');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    annualIncome: '',
    monthlyExpenses: {
      housing: '',
      food: '',
      transportation: '',
      utilities: '',
      other: ''
    },
    currentSavings: '',
    riskTolerance: 'medium'
  });

  // Access router, Redux store, and toast
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const toast = useToast();

  // State for managing financial goals using checkbox group
  const { value: financialGoals, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  useEffect(() => {
  }, [formData, financialGoals]);

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData  => ({
      ...prevData,
      [name]: value  

    }));
  };

  // Handle changes in monthly expense fields
  const handleExpenseChange = (category: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      monthlyExpenses: {
        ...prevData.monthlyExpenses,
        [category]: value
      }
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Prepare onboarding data for API call
      const onboardingData = {
        ...formData,
        financialGoals,
        annualIncome: Number(formData.annualIncome),
        currentSavings: Number(formData.currentSavings),
        monthlyExpenses: Object.fromEntries(
          Object.entries(formData.monthlyExpenses).map(([key, value]) => [key, Number(value)])
        )
      };
      const response = await completeOnboarding(onboardingData, token || '');
      dispatch(setCredentials({ ...response, token: token || '' }));
      router.push('/');
      toast({
        title: "Onboarding Complete",
        description: "Your financial profile has been set up successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Onboarding error:', err);
      toast({
        title: "Onboarding Incomplete",
        description: "We couldn't complete your financial profile setup. Please try again later or contact support if the problem persists.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Proceed to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Handle 'Enter' key press for navigation and submission
  const handleKeyPress = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < 4) {
        nextStep();
      } else {
        handleSubmit(e);
      }
    }
  };

  // Render the current step's content
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VStack spacing={4} align="stretch">
            <Heading size="md">Income Information</Heading>
            <Text>Understanding your income helps us provide more accurate financial advice.</Text>
            <FormControl>
              <FormLabel htmlFor="annualIncome">Annual Income (USD):</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  type="number"
                  id="annualIncome"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter amount in USD"
                />
              </InputGroup>
            </FormControl>
          </VStack>
        );
      case 2:
        return (
          <VStack spacing={4} align="stretch">
            <Heading size="md">Monthly Expenses</Heading>
            <Text>Knowing your expenses helps us understand your spending habits and suggest better budgeting strategies.</Text>
            {Object.entries(formData.monthlyExpenses).map(([category, value]) => (
              <FormControl key={category}>
                <FormLabel htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)} (USD):</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input
                    type="number"
                    id={category}
                    value={value}
                    onChange={(e) => handleExpenseChange(category, e.target.value)}
                    placeholder="Enter amount in USD"
                  />
                </InputGroup>
              </FormControl>
            ))}
          </VStack>
        );
      case 3:
        return (
          <VStack spacing={4} align="stretch">
            <Heading size="md">Savings and Goals</Heading>
            <Text>Your current savings and financial goals help us tailor our advice to your specific situation.</Text>
            <FormControl>
              <FormLabel htmlFor="currentSavings">Current Savings (USD):</FormLabel>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  type="number"
                  id="currentSavings"
                  name="currentSavings"
                  value={formData.currentSavings}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter amount in USD"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Financial Goals:</FormLabel>
              <Text mb={2}>The selected goals are: {financialGoals.sort().join(', ')}</Text>
              <Stack spacing={2}>
                <CustomCheckbox 
                  {...getCheckboxProps({ value: 'retirement' })}
                  label="Retirement"
                />
                <CustomCheckbox 
                  {...getCheckboxProps({ value: 'homePurchase' })}
                  label="Home Purchase"
                />
                <CustomCheckbox 
                  {...getCheckboxProps({ value: 'debtPayoff' })}
                  label="Debt Payoff"
                />
                <CustomCheckbox 
                  {...getCheckboxProps({ value: 'investment' })}
                  label="Investment"
                />
                <CustomCheckbox 
                  {...getCheckboxProps({ value: 'other' })}
                  label="Other"
                />
              </Stack>
            </FormControl>
          </VStack>
        );
      case 4:
        return (
          <VStack spacing={4} align="stretch">
            <Heading size="md">Risk Tolerance</Heading>
            <Text>Your risk tolerance helps us recommend appropriate investment strategies.</Text>
            <FormControl>
              <FormLabel htmlFor="riskTolerance">Risk Tolerance:</FormLabel>
              <Select
                id="riskTolerance"
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleInputChange}
              >
                <option value="low">Low - I prefer safer investments with lower returns</option>
                <option value="medium">Medium - I'm comfortable with a balanced approach</option>
                <option value="high">High - I'm willing to take risks for potentially higher returns</option>
              </Select>
            </FormControl>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Complete Your Financial Profile</Heading>
        <Text>Help us understand your financial situation to provide personalized advice. All amounts are in USD.</Text>
        <Progress value={(step / 4) * 100} />
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          {renderStep()}
          <VStack mt={6} spacing={4}>
            {step < 4 && (
              <Button 
                onClick={nextStep} 
                colorScheme="brand" 
                bg="black"
                color={buttonColor}
                w="20%"
              >
                Next
              </Button>
            )}
            {step === 4 && (
              <Button 
                type="submit" 
                colorScheme="brand" 
                bg="black"
                color={buttonColor}
                w="40%"
              >
                Complete Onboarding
              </Button>
            )}
            {step > 1 && (
              <Button 
                onClick={prevStep} 
                colorScheme="brand" 
                variant="outline"
                w="20%"
              >
                Previous
              </Button>
            )}
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Onboarding;