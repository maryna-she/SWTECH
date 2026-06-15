package com.shopproject.products;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
class ProductDataInitializer implements CommandLineRunner {
    private final ProductsRepository repository;

    ProductDataInitializer(ProductsRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        repository.deleteAll();

        repository.saveAll(List.of(
                // Hiking
                new ProductEntity(null, "Trailhead 38L Backpack", "Light 38-liter backpack for day hikes and weekend routes.", BigDecimal.valueOf(129), 15),
                new ProductEntity(null, "Peak 3-Layer Shell Jacket", "Fully waterproof hardshell for demanding mountain conditions.", BigDecimal.valueOf(219), 10),
                new ProductEntity(null, "Merino 150 Base Layer", "100% merino wool base layer, odour-resistant and temperature-regulating.", BigDecimal.valueOf(79), 28),
                new ProductEntity(null, "Granite Trail Shoes", "Fast trail shoes with aggressive lug pattern for wet rock and loose terrain.", BigDecimal.valueOf(149), 20),
                new ProductEntity(null, "Carbon Trekking Poles", "Ultralight carbon poles with tool-free adjustment, fold to 38 cm.", BigDecimal.valueOf(119), 13),
                // Camping
                new ProductEntity(null, "Ultralight 2-Person Tent", "Fully freestanding 3-season tent, just 1.4 kg packed.", BigDecimal.valueOf(349), 8),
                new ProductEntity(null, "Down Sleeping Bag −5 °C", "Sleeping bag with 650-fill down, warm to −5°C.", BigDecimal.valueOf(189), 12),
                new ProductEntity(null, "Flash Cooking System", "Integrated cooking system boils 500 ml in under 100 seconds.", BigDecimal.valueOf(99), 22),
                new ProductEntity(null, "Ultralight Camp Chair", "Just 890 g, folds smaller than a water bottle.", BigDecimal.valueOf(139), 17),
                new ProductEntity(null, "Trail Water Filter", "Filters 99.9999% of bacteria in real time, lasts 100,000 litres.", BigDecimal.valueOf(69), 35),
                // Surfing
                new ProductEntity(null, "Fun Shape Surfboard 6'2\"", "Versatile mid-length for waist-to-head-high surf.", BigDecimal.valueOf(489), 6),
                new ProductEntity(null, "4/3 Steamer Wetsuit", "4/3 mm neoprene with chest zip, warm in 10-16 °C water.", BigDecimal.valueOf(259), 11),
                new ProductEntity(null, "Classic Longboard 9'0\"", "Traditional single-fin longboard for noseriding.", BigDecimal.valueOf(699), 4),
                new ProductEntity(null, "Surf & Dry Backpack 30L", "Waterproof shell with insulated wetsuit compartment.", BigDecimal.valueOf(89), 18),
                new ProductEntity(null, "Pro Surf Leash 6'", "6 mm thin leash with double swivel, minimal drag in the water.", BigDecimal.valueOf(39), 42)
        ));
    }
}
