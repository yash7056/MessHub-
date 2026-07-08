import React, { useState } from 'react';
import { Mess } from '../../data/mockData';
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation,
  ChefHat,
  Leaf,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send
} from 'lucide-react';
import { messAPI } from '../../services/api';

interface MessCardProps {
  mess: Mess;
}

const MessCard: React.FC<MessCardProps> = ({ mess: initialMess }) => {
  const [mess, setMess] = useState<Mess>(initialMess);
  const [showReviews, setShowReviews] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${mess.coordinates.lat},${mess.coordinates.lng}`;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const updatedMess = await messAPI.addReview(mess.id, rating, comment);
      // Map _id to id
      const mapped = {
        ...updatedMess,
        id: updatedMess._id || updatedMess.id
      };
      setMess(mapped);
      setComment('');
      setRating(5);
      setShowWriteReview(false);
      alert('Review submitted successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to submit review. Are you logged in?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">{mess.name}</h3>
              {mess.isVeg ? (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-green-200">
                  <Leaf className="h-3 w-3 text-green-500 fill-green-500" />
                  Veg
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-red-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  Non-Veg
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 flex items-center">
              <ChefHat className="h-4 w-4 mr-1" />
              by {mess.owner && (typeof mess.owner === 'object' ? (mess.owner as any).name : mess.owner)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              mess.isOpen 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {mess.isOpen ? 'Open Now' : 'Closed'}
            </span>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-900 ml-1">
                {mess.rating}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                ({mess.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center text-gray-600 mb-4 p-3 bg-gray-50 rounded-xl">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-orange-500" />
          <span className="text-sm flex-1 truncate">{mess.address}</span>
          <span className="text-sm font-semibold text-orange-600 ml-2">{mess.distance} km</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">₹{mess.lunchPrice}</div>
            <div className="text-xs text-gray-600 font-medium">Lunch</div>
          </div>
          <div className="w-px h-10 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">₹{mess.dinnerPrice}</div>
            <div className="text-xs text-gray-600 font-medium">Dinner</div>
          </div>
        </div>
      </div>

      {/* Today's Menu */}
      <div className="px-6 pb-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <ChefHat className="h-4 w-4 mr-2 text-orange-600" />
          Today's Menu
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2 text-center border-b pb-1">Lunch</h5>
            <div className="space-y-1">
              {mess.todaysMenu.lunch.slice(0, 3).map((item, index) => (
                <div key={index} className="text-xs text-gray-700 bg-orange-50 px-2 py-1.5 rounded-lg text-center font-medium truncate">
                  {item}
                </div>
              ))}
              {mess.todaysMenu.lunch.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2">Not scheduled</div>
              )}
              {mess.todaysMenu.lunch.length > 3 && (
                <div className="text-xs text-gray-500 text-center py-1">
                  +{mess.todaysMenu.lunch.length - 3} more items
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-2 text-center border-b pb-1">Dinner</h5>
            <div className="space-y-1">
              {mess.todaysMenu.dinner.slice(0, 3).map((item, index) => (
                <div key={index} className="text-xs text-gray-700 bg-blue-50 px-2 py-1.5 rounded-lg text-center font-medium truncate">
                  {item}
                </div>
              ))}
              {mess.todaysMenu.dinner.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2">Not scheduled</div>
              )}
              {mess.todaysMenu.dinner.length > 3 && (
                <div className="text-xs text-gray-500 text-center py-1">
                  +{mess.todaysMenu.dinner.length - 3} more items
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand Reviews Toggle */}
      <div className="px-6 pb-2">
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="w-full flex items-center justify-between py-2 text-sm text-gray-600 hover:text-gray-900 border-t border-dashed border-gray-200 mt-2 font-medium"
        >
          <span className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-orange-500" />
            Reviews ({mess.reviews?.length || 0})
          </span>
          {showReviews ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showReviews && (
          <div className="py-3 space-y-3 max-h-60 overflow-y-auto border-t mt-1">
            {/* Reviews List */}
            {mess.reviews && mess.reviews.length > 0 ? (
              mess.reviews.map((rev, i) => (
                <div key={rev._id || i} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-gray-800">{rev.customerName}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-3 w-3 ${
                            starIdx < rev.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-2">No reviews yet.</p>
            )}

            {/* Review form toggle */}
            {!showWriteReview ? (
              <button
                onClick={() => setShowWriteReview(true)}
                className="w-full py-2 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-lg text-xs font-semibold transition-all"
              >
                + Write a Review
              </button>
            ) : (
              <form onSubmit={handleReviewSubmit} className="bg-white p-3 rounded-xl border border-orange-100 space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">Your Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience (homely, spicy, budget friendly...)"
                  className="w-full p-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none h-16 resize-none"
                  required
                />
                <div className="flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowWriteReview(false)}
                    className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-semibold disabled:opacity-50"
                  >
                    <Send className="h-3 w-3" />
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t flex gap-3">
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </a>
        <a
          href={`tel:${mess.phone}`}
          className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all transform hover:scale-105"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default MessCard;