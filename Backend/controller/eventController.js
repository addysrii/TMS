import Event from "../modles/eventModel.js"

const createEvent = async(req,res) => {
const  {title,description,date,location,price,seats} = req.body
  const imagePath = `/uploads/EventImages/${req.file.filename}`;
  console.log('Image Path:', imagePath); // Log the image path

  const [day, month, year] = date.split('-');
  const parsedDate = new Date(`${year}-${month}-${day}`);
const event=new Event({
    title,
    description,
    date : parsedDate,
    location, 
    price,
    seats,
    image : imagePath,
    createdBy: req.user._id
})
const createdEvent = await event.save();
res.status(201).json(createdEvent)
}
const getEvents = async (req, res) => {
  try {
    const { title, location, date } = req.query;
    let query = {};

    if (title) {
      // Use regex for case-insensitive search
      query.title = { $regex: title, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (date) {
      // Convert date format and adjust for start and end of the day
      const parsedDate = new Date(date);
      query.date = {
        $gte: parsedDate.setHours(0, 0, 0, 0),
        $lte: parsedDate.setHours(23, 59, 59, 999),
      };
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async(req,res) =>{
    const event = await Event.findById(req.params.id)

    if(event){
        res.json(event)
    }else{
        res.status(404)
        throw new Error("Event not found")
    }
}

const   bookEvent = async(req,res) => {
const event =await Event.findById(req.paramas.id)

if(event){
    if(event.bookedSeats>=event.seats){
        res.status(400);
        throw new Error('No seats available')
    }
    event.bookedSeats +=1;
    await event.save()
    res.json({message : "Event Booked Succsessfully"})
}else{
    res.status(404)
    throw new Error('Event not found')
}
}

export  {createEvent, getEvents, getEventById, bookEvent}