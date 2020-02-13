const mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment'),
      User       = require('./models/user');

var data = [
  {
    name: "Camping Hossan Lumo",
    image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nulla laoreet, euismod odio vitae, venenatis elit. Maecenas elementum semper lacinia. Fusce vel quam dictum, scelerisque eros et, bibendum nisi. Nunc vestibulum, eros sit amet consequat lobortis, nibh nulla porta lorem, in condimentum nisl lectus vel dolor. Morbi placerat velit ac nulla porttitor posuere. Etiam at efficitur sem. Etiam tellus mauris, sollicitudin ut enim ut, gravida egestas eros. Donec porta erat elit, quis laoreet tortor tincidunt at. Etiam eu ex bibendum, fringilla risus vel, tempus libero. Pellentesque posuere nisi eget felis pellentesque, eget volutpat libero auctor. Nullam non tortor ullamcorper, interdum metus id, luctus est. Nunc sagittis velit ac tortor luctus imperdiet. Vivamus ut nisi dignissim, interdum orci eget, volutpat odio. Integer ullamcorper, lectus id viverra semper, orci arcu iaculis diam, ac varius nunc ex quis est. Donec ultrices ultricies porta. Fusce nulla ipsum, imperdiet ultricies ex sit amet, accumsan rutrum lacus. Nullam tempor venenatis sem a vulputate. Sed vel justo at risus maximus cursus et eu velit. Pellentesque posuere laoreet est, sit amet posuere eros pulvinar vel. Nullam pharetra id mauris non euismod. Fusce massa arcu, consectetur vel vestibulum eget, sollicitudin ut neque.",
    contact: "John Smith",
    phone: "+358 50 0166377",
    address: "Lumontie 3, Ruhtinansalmi, 89920 Hossa, Finland",
    price: 14.74
  },
  {
    name: "EcoCamp Patagonia",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nulla laoreet, euismod odio vitae, venenatis elit. Maecenas elementum semper lacinia. Fusce vel quam dictum, scelerisque eros et, bibendum nisi. Nunc vestibulum, eros sit amet consequat lobortis, nibh nulla porta lorem, in condimentum nisl lectus vel dolor. Morbi placerat velit ac nulla porttitor posuere. Etiam at efficitur sem. Etiam tellus mauris, sollicitudin ut enim ut, gravida egestas eros. Donec porta erat elit, quis laoreet tortor tincidunt at. Etiam eu ex bibendum, fringilla risus vel, tempus libero. Pellentesque posuere nisi eget felis pellentesque, eget volutpat libero auctor. Nullam non tortor ullamcorper, interdum metus id, luctus est. Nunc sagittis velit ac tortor luctus imperdiet. Vivamus ut nisi dignissim, interdum orci eget, volutpat odio. Integer ullamcorper, lectus id viverra semper, orci arcu iaculis diam, ac varius nunc ex quis est. Donec ultrices ultricies porta. Fusce nulla ipsum, imperdiet ultricies ex sit amet, accumsan rutrum lacus. Nullam tempor venenatis sem a vulputate. Sed vel justo at risus maximus cursus et eu velit. Pellentesque posuere laoreet est, sit amet posuere eros pulvinar vel. Nullam pharetra id mauris non euismod. Fusce massa arcu, consectetur vel vestibulum eget, sollicitudin ut neque.",
    contact: "John Smith",
    phone: "+56 2 2923 5974",
    address: "Cerro Castillo, Torres de Paine, Magallanes y la Antártica Chilena, Chile",
    price: 8.49
  },
  {
    name: "Denali National Park Campground",
    image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nulla laoreet, euismod odio vitae, venenatis elit. Maecenas elementum semper lacinia. Fusce vel quam dictum, scelerisque eros et, bibendum nisi. Nunc vestibulum, eros sit amet consequat lobortis, nibh nulla porta lorem, in condimentum nisl lectus vel dolor. Morbi placerat velit ac nulla porttitor posuere. Etiam at efficitur sem. Etiam tellus mauris, sollicitudin ut enim ut, gravida egestas eros. Donec porta erat elit, quis laoreet tortor tincidunt at. Etiam eu ex bibendum, fringilla risus vel, tempus libero. Pellentesque posuere nisi eget felis pellentesque, eget volutpat libero auctor. Nullam non tortor ullamcorper, interdum metus id, luctus est. Nunc sagittis velit ac tortor luctus imperdiet. Vivamus ut nisi dignissim, interdum orci eget, volutpat odio. Integer ullamcorper, lectus id viverra semper, orci arcu iaculis diam, ac varius nunc ex quis est. Donec ultrices ultricies porta. Fusce nulla ipsum, imperdiet ultricies ex sit amet, accumsan rutrum lacus. Nullam tempor venenatis sem a vulputate. Sed vel justo at risus maximus cursus et eu velit. Pellentesque posuere laoreet est, sit amet posuere eros pulvinar vel. Nullam pharetra id mauris non euismod. Fusce massa arcu, consectetur vel vestibulum eget, sollicitudin ut neque.",
    contact: "John Smith",
    phone: "+1 800-622-7275",
    address: "Healy, AK 99743, United States",
    price: 12.65
  },
  {
    name: "Sahale Glacier Camp",
    image: "https://images.unsplash.com/photo-1580737739989-d98ca8473104?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nulla laoreet, euismod odio vitae, venenatis elit. Maecenas elementum semper lacinia. Fusce vel quam dictum, scelerisque eros et, bibendum nisi. Nunc vestibulum, eros sit amet consequat lobortis, nibh nulla porta lorem, in condimentum nisl lectus vel dolor. Morbi placerat velit ac nulla porttitor posuere. Etiam at efficitur sem. Etiam tellus mauris, sollicitudin ut enim ut, gravida egestas eros. Donec porta erat elit, quis laoreet tortor tincidunt at. Etiam eu ex bibendum, fringilla risus vel, tempus libero. Pellentesque posuere nisi eget felis pellentesque, eget volutpat libero auctor. Nullam non tortor ullamcorper, interdum metus id, luctus est. Nunc sagittis velit ac tortor luctus imperdiet. Vivamus ut nisi dignissim, interdum orci eget, volutpat odio. Integer ullamcorper, lectus id viverra semper, orci arcu iaculis diam, ac varius nunc ex quis est. Donec ultrices ultricies porta. Fusce nulla ipsum, imperdiet ultricies ex sit amet, accumsan rutrum lacus. Nullam tempor venenatis sem a vulputate. Sed vel justo at risus maximus cursus et eu velit. Pellentesque posuere laoreet est, sit amet posuere eros pulvinar vel. Nullam pharetra id mauris non euismod. Fusce massa arcu, consectetur vel vestibulum eget, sollicitudin ut neque.",
    contact: "John Smith",
    phone: "+1 360-854-7200",
    address: "North Cascades National Park, Marblemount, WA 98267",
    price: 13.10
  },
  {
    name: "Polzeath Beach Campsite",
    image: "https://images.unsplash.com/photo-1545401269-e4d9f28a15fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in nulla laoreet, euismod odio vitae, venenatis elit. Maecenas elementum semper lacinia. Fusce vel quam dictum, scelerisque eros et, bibendum nisi. Nunc vestibulum, eros sit amet consequat lobortis, nibh nulla porta lorem, in condimentum nisl lectus vel dolor. Morbi placerat velit ac nulla porttitor posuere. Etiam at efficitur sem. Etiam tellus mauris, sollicitudin ut enim ut, gravida egestas eros. Donec porta erat elit, quis laoreet tortor tincidunt at. Etiam eu ex bibendum, fringilla risus vel, tempus libero. Pellentesque posuere nisi eget felis pellentesque, eget volutpat libero auctor. Nullam non tortor ullamcorper, interdum metus id, luctus est. Nunc sagittis velit ac tortor luctus imperdiet. Vivamus ut nisi dignissim, interdum orci eget, volutpat odio. Integer ullamcorper, lectus id viverra semper, orci arcu iaculis diam, ac varius nunc ex quis est. Donec ultrices ultricies porta. Fusce nulla ipsum, imperdiet ultricies ex sit amet, accumsan rutrum lacus. Nullam tempor venenatis sem a vulputate. Sed vel justo at risus maximus cursus et eu velit. Pellentesque posuere laoreet est, sit amet posuere eros pulvinar vel. Nullam pharetra id mauris non euismod. Fusce massa arcu, consectetur vel vestibulum eget, sollicitudin ut neque.",
    contact: "John Smith",
    phone: "+441208 863320",
    address: "Mill Lane, Polzeath, Wadebridge PL27 6SS",
    price: 8.75
  },
  {
    name: "Tsusumigaura Nature Park",
    image: "https://images.unsplash.com/photo-1548848391-eff4cd3e0b65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
    contact: "John Smith",
    phone: "+44-5555-555555",
    address: "1195 Miyajimacho, Hatsukaichi, Hiroshima 739-0588, Japan",
    price: 18.23
  }
];

var admin = {
  username: "Admin",
  password: "password"
}


function seedDB() {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      // Remove all comments
      Comment.deleteMany({}, (err) => {
        if (err) {
          console.log(err);
        } else {
          User.deleteOne({username: "Admin"}, (err) => {
            if (err) {
              console.log(err)
            } else {
              // Create Admin user
              User.register(new User({username: admin.username}), admin.password, (err, user) => {
                if (err) {
                  console.log(err);
                } else {
                  // Add some campgrounds
                  data.forEach((campground) => {
                    campground.addedBy = {
                      id: user._id,
                      username: user.username
                    };
                    Campground.create(campground, (err, campground) => {
                      if (err) {
                        console.log(err);
                      } else {
                        Comment.create({
                          text: "This place is great, but I wish there was internet",
                          author: {
                            id: user._id,
                            username: user.username
                          }
                        }, function (err, comment) {
                          if (err) {
                            console.log(err);
                          } else {
                            campground.comments.push(comment);
                            campground.save();
                          }
                        });
                      }
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
  });


}

module.exports = seedDB;
