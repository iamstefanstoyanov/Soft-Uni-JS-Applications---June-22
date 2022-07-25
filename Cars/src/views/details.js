import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../data/cars.js';


const detailsTemplate = (car) => html`
<h2>Details Page</h2>
${car
        ? html`
<p>Make: ${car.make}</p>
<p>Model: ${car.model}</p>`
        : 'Loading...'}`;


export async function showDetails(ctx) {
    const productId = ctx.params.productId;

    ctx.render(detailsTemplate());

    const car = await getById(productId)

    ctx.render(detailsTemplate(car));
}