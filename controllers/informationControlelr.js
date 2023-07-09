const Information = require('../models/informations')

exports.getAbout = async (req,res) =>{
  try{
    let about = await Information.findOne({ name:'about' })
    return res.status(200).send(about.value)
  }catch(error){
    return res.status(500).send('No About Yet')
  }
}


exports.getTerms = async (req,res) =>{
  try{
    let terms = await Information.findOne({ name:'terms' })
    return res.status(200).send(terms.value)
  }catch(error){
    return res.status(500).send('No Terms Yet')
  }
}


exports.updateAbout = async (req,res) =>{
  const newAbout = req.body.about

  try{
    let exists = await Information.findOne({ name:'about' })
    if(!exists){
      let aboutIt = new Information({ name:'about',value:newAbout })
      return res.status(200).send(aboutIt.value)
    }

    let updated = await Information.findOneAndUpdate({ name:'about' },{
      value: newAbout
    },{$new:true})

    return res.status(201).send(updated.value)
  }catch(error){
    return res.status(500).send(error)
  }
}

exports.updateTerms = async (req,res) =>{
  const newTerms = req.body.terms

  try{
    let exists = await Information.findOne({ name:'terms' })
    if(!exists){
      let aboutIt = new Information({ name:'terms',value:newTerms })
      return res.status(200).send(aboutIt.value)
    }

    let updated = await Information.findOneAndUpdate({ name:'terms' },{
      value: newTerms
    },{$new:true})

    return res.status(201).send(updated.value)
  }catch(error){
    return res.status(500).send(error)
  }
}
