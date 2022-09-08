﻿using Mapster;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CharityAuction.Api.Models
{
    public class Auction
    {
        [Key]
        [AdaptIgnore]

        public virtual int Id { get; set; }

        [MaxLength(255)]
        public virtual string Name { get; set; }
        [MaxLength(2048)]
        public virtual string Description { get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual DateTime EndDate { get; set; }
        public virtual int? LogoImageId { get; set; }

        [NotMapped]
        public bool BiddingActive { get => StartDate <= DateTime.Now && EndDate >= DateTime.Now; }

        [JsonIgnore]
        public virtual ICollection<AuctionItem> Items { get; set; }

        [NotMapped]
        public virtual int ItemCount { get => Items.Count(); }
    }
}
