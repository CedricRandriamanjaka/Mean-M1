var express = require('express');
const router = express.Router();

const ServiceService = require('../services/service');
const serviceService = new ServiceService();

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: './public/Images/Service',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// router.post('/', upload.single('image'), async (req, res) => {
//     const data = req.body;
//     console.log(req.file);
//     console.log(data);
  
//     try {

//       // const result = await serviceService.createService(data);
//       const result = await serviceService.createService(data, req.file);
//       res.status(201).json(result);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
  router.get('/', async (req, res) => {
    try {
      const services = await serviceService.getServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/nonSpecial', async (req, res) => {
    try {
      const services = await serviceService.getServicesNonSpecial();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/serviceSpecial/', async (req, res) => {
    try {
      const services = await serviceService.getServiceSpecial();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/serviceCompetence/:idUser', async (req, res) => {
    const { idUser } = req.params;

    try {
      const services = await serviceService.getServiceComp(idUser);
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
  
  // router.put('/:id', upload.single('image'), async (req, res) => {
  //   const { id } = req.params;
  //   const updatedData = req.body;
  //   console.log(req.body);
  //   console.log(req.file);
  
  //   try {
  //     const updatedService = await serviceService.updateService(id, updatedData, req.file);
  //     res.status(200).json(updatedService);
  //   } catch (error) {
  //     res.status(404).json({ message: error.message });
  //   }
  // });
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await serviceService.deleteService(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get('/getEmployesByCompetence/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const employes = await serviceService.getEmployesByCompetence(id);
      res.status(200).json(employes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  module.exports = router;
