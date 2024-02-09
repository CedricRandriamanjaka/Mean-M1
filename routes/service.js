var express = require('express');
const router = express.Router();

const ServiceService = require('../services/service');
const serviceService = new ServiceService();

router.post('/', async (req, res) => {
    const data = req.body;
  
    try {
      const result = await serviceService.createService(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const services = await serviceService.getServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const service = await serviceService.getServiceById(id);
      res.status(200).json(service);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedService = await serviceService.updateService(id, updatedData);
      res.status(200).json(updatedService);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await serviceService.deleteService(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  module.exports = router;
