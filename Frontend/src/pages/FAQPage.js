import React from 'react';
import { Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
    const faqs = [
      {
        question: 'How do I submit a support request?',
        answer: 'To submit a support request, please visit the Contact page and fill out the form with your inquiry. Our team will get back to you as soon as possible.'
      },
      {
        question: 'What are the operating hours of your customer support?',
        answer: 'Our customer support team is available Monday to Friday, from 9 AM to 5 PM EST. For urgent inquiries outside of these hours, please contact our emergency support line.'
      },
      {
        question: 'How long does it take to resolve a support ticket?',
        answer: 'The resolution time for support tickets can vary depending on the complexity of the issue. We strive to resolve all tickets within 1-2 business days, but in some cases, it may take longer. We will keep you updated on the status of your ticket.'
      },
      {
        question: 'Do you offer any self-help resources?',
        answer: 'Yes, we have a comprehensive Knowledge Base that contains articles, tutorials, and guides to help you troubleshoot common issues. You can access the Knowledge Base from the main navigation menu.'
      }
    ];
  
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={4}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-${index}-content`}
                  id={`faq-${index}-header`}
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  export default FAQPage;