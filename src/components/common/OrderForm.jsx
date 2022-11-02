/* 

@param props - Just the standard React props
@param {function} props.orderAction - The callback to run with the order details once input validation has completed
@param {Array[Object]} props.inventory - An array of computer parts that are selectable in the form
@param {Object} defaultValues - An object containing the values of an order to edit or null/undefined if creating a new order

The OrderForm is a form used to either create a new order or update an existing order.

*/

export default function OrderForm({ orderAction, inventory, defaultValues }) {

    // List of the parts that we want to be able to select. The inventory
    // has a bunch of parts, but we only want to get the parts that have these
    // types. Meaning, we only want the motherboards, the CPUs and the RAM.
    const requiredParts = ["motherboard", "cpu", "ram"];

    // Setting values like this is so that we don't have to provide a
    // defaultValues prop. If we have one, we use that, otherwise, we just
    // use an empty object, which will set all our inputs to empty.
    const values = defaultValues || {};

    // On submitting this form, we're validating the inputs that we gave to it
    // and then we're formatting the order object that we want to save
  function onFormSubmit(e) {
    e.preventDefault();

    // We save each part from requiredParts as a key value pair in the parts
    // object, so that it looks like "partType" => "partId". This way, we know
    // that for example, this particular order will have a motherboard that 
    // references the part with a given ID
    const parts = {};
    requiredParts.forEach(part => {
        parts[part] = e.target[part].value;
    });

    // If there's any part that hasn't been selected, meaning that the key for
    // that part in requiredParts is undefined, that means the user didn't select
    // an item from the inventory for that part type. If that's the case, then
    // we yell at them.
    if(Object.values(parts).some(part => !part)) {
        return alert("All parts must be selected");
    }

    // We get the customer name here and once again, yell at them if they
    // don't give us their name.
    const customerName = e.target.customer.value;
    if(!customerName) {
        return alert("Customer name must be provided");
    }
    else {
        // If everything checks out, then we call the callback that we get from
        // either the CreateOrder page or the Order page, which should handle
        // either creating the order or updating the order, depending on the
        // callback we have in orderAction.
        orderAction({
            parts, 
            customer: customerName,
            status: e.target.status?.value,
        })
    }
}

  return (
    <form onSubmit={onFormSubmit}>
        <label>
            Customer Name:
            <input name="customer" type="text" defaultValue={values.customer} />
        </label>
        {
            // Go through the required parts and for each one, make a select
            // For each select, get the parts that are of the requiredPart type.
            // As an example, for the first value, "motherboard", we filter on
            // the inventory to get all the motherboards so we can just show those
            // items for that select input.
            requiredParts.map(part => {
                return (
                    <div>
                        <span>{ part }</span>
                        <select name={part} defaultValue={values[part]}>
                            {inventory.filter(i => i.type === part).map(i => {
                                return (
                                    <option value={i.id}>{i.name}</option>
                                )
                            })}
                        </select>
                    </div>
                )
            })
        }
        {
            // If we provide something for defaultValues, we know that we're
            // editing the form. If we're editing the form, then we can also
            // show something to update the status.
            defaultValues ? (
                <select name="status" defaultValue={values.status}>
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                </select>
            ) : null
        }
        <input type="submit" />
    </form>
)
}